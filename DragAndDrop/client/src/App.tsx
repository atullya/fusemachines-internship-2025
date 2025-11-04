import { useEffect, useState, useCallback } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
} from "@hello-pangea/dnd";
import api from "./api";
import { STAGE_LIST } from "./types";
import type { Board, Candidate, StageId } from "./types";

import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";

import AddCandidateModal from "./components/ui/modals/AddCandidateModal";
import AddCandidateForm from "./components/ui/modals/AddCandidateModal";

const emptyBoard = (): Board => ({
  preliminary: [],
  technical: [],
  additional: [],
  client: [],
  selection: [],
});

export default function App() {
  const [board, setBoard] = useState<Board>(emptyBoard());
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);

  const fetchBoard = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Board>("/candidates");
      setBoard(data);
    } catch {
      console.error("Failed to load board");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoard();
  }, [fetchBoard]);

  // Called by the modal on submit. Only sends name + roleTitle to backend (per your current schema).
  const handleCreateCandidate = async (form: AddCandidateForm) => {
    try {
      const { data } = await api.post<Candidate>("/candidates", {
        name: form.name,
        roleTitle: form.roleTitle,
      });
      // Optimistically append to Preliminary
      setBoard((prev) => {
        const next = { ...prev };
        next.preliminary = [...next.preliminary, data];
        return next;
      });
    } catch (e) {
      console.error("Failed to add candidate", e);
      throw e; // let modal keep button state or show error if you add toasts later
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const from = source.droppableId as StageId;
    const to = destination.droppableId as StageId;
    if (from === to && source.index === destination.index) return;

    // optimistic UI
    const prev = board;
    const next: Board = {
      ...board,
      [from]: [...board[from]],
      [to]: from === to ? [...board[to]] : [...board[to]],
    };

    const [moved] = next[from].splice(source.index, 1);
    next[to].splice(destination.index, 0, { ...moved, stage: to });
    setBoard(next);

    try {
      await api.patch(`/candidates/${draggableId}/move`, {
        toStage: to,
        toIndex: destination.index,
      });
      fetchBoard(); // refresh for consistent order
    } catch (e) {
      console.error("Failed to move candidate", e);
      setBoard(prev);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Interview Pipeline</h1>
          <p className="text-sm text-muted-foreground">
            Drag and drop candidates between the stages
          </p>
        </div>
        <div>
          <Button onClick={() => setOpenAdd(true)}>Add Candidate</Button>
        </div>
      </header>

      {loading ? (
        <div>Loading…</div>
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {STAGE_LIST.map((col) => (
              <Droppable droppableId={col.id} key={col.id}>
                {(dropProvided, dropSnapshot) => (
                  <Card
                    className={`min-h-[420px] ${
                      dropSnapshot.isDraggingOver ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center justify-between">
                        <span>{col.title}</span>
                        <span className="text-sm text-muted-foreground">
                          {board[col.id].length}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        ref={dropProvided.innerRef}
                        {...dropProvided.droppableProps}
                      >
                        <ScrollArea className="h-[360px] pr-2">
                          {board[col.id].map((item, index) => (
                            <Draggable
                              draggableId={item._id}
                              index={index}
                              key={item._id}
                            >
                              {(dragProvided, dragSnapshot) => (
                                <div
                                  ref={dragProvided.innerRef}
                                  {...dragProvided.draggableProps}
                                  {...dragProvided.dragHandleProps}
                                  className={`mb-2 rounded-md border bg-card p-3 text-sm shadow-sm transition ${
                                    dragSnapshot.isDragging
                                      ? "ring-2 ring-primary"
                                      : ""
                                  }`}
                                >
                                  <div className="font-medium">{item.name}</div>
                                  <div className="text-muted-foreground">
                                    {item.roleTitle}
                                  </div>
                                  <div className="mt-2 text-xs text-muted-foreground">
                                    Applied:{" "}
                                    {new Date(
                                      item.createdAt
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {dropProvided.placeholder}
                        </ScrollArea>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      )}

      <AddCandidateModal
        open={openAdd}
        onOpenChange={setOpenAdd}
        onSubmit={handleCreateCandidate}
      />
    </div>
  );
}
