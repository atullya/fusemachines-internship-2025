import { RequestHandler } from "express";
import CandidateModel, { STAGES, Stage } from "../models/Candidate";

type Board = Record<Stage, any[]>;
const emptyBoard = (): Board => ({
  preliminary: [],
  technical: [],
  additional: [],
  client: [],
  selection: [],
});

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

// GET /api/candidates → grouped board
export const getBoard: RequestHandler = async (_req, res) => {
  try {
    const docs = await CandidateModel.find().sort({ order: 1 }).lean();
    const board = emptyBoard();
    for (const c of docs) board[c.stage as Stage].push(c);
    // Ensure each column is sorted
    Object.values(board).forEach((arr) =>
      arr.sort((a: any, b: any) => a.order - b.order)
    );
    res.json(board);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to fetch candidates" });
  }
};

// POST /api/candidates { name, roleTitle } → creates in "preliminary" at end
export const createCandidate: RequestHandler = async (req, res) => {
  try {
    const { name, roleTitle } = req.body as { name: string; roleTitle: string };
    if (!name || !roleTitle)
      return res
        .status(400)
        .json({ message: "name and roleTitle are required" });

    const count = await CandidateModel.countDocuments({ stage: "preliminary" });
    const doc = await CandidateModel.create({
      name,
      roleTitle,
      stage: "preliminary",
      order: count,
    });
    res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    res.status(400).json({ message: "Failed to create candidate" });
  }
};

// PATCH /api/candidates/:id/move { toStage, toIndex? }
// Simple approach: remove from source list, insert in target, then reindex both lists and bulkWrite.
export const moveCandidate: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const { toStage, toIndex } = req.body as {
      toStage: Stage;
      toIndex?: number;
    };

    if (!toStage || !STAGES.includes(toStage)) {
      return res.status(400).json({ message: "Invalid toStage" });
    }

    const current = await CandidateModel.findById(id).lean();
    if (!current)
      return res.status(404).json({ message: "Candidate not found" });

    const fromStage = current.stage as Stage;

    // If you want to force step-by-step moves, uncomment:
    // const fromIdx = STAGES.indexOf(fromStage);
    // const toIdx = STAGES.indexOf(toStage);
    // if (!(toStage === fromStage || toIdx === fromIdx + 1)) {
    //   return res.status(400).json({ message: 'Can only move within same stage or to the next stage' });
    // }

    if (toStage === fromStage) {
      const list = await CandidateModel.find({ stage: fromStage })
        .sort({ order: 1 })
        .lean();
      const curIndex = list.findIndex((x: any) => String(x._id) === String(id));
      if (curIndex === -1)
        return res
          .status(404)
          .json({ message: "Candidate not found in stage" });

      const [item] = list.splice(curIndex, 1);
      const insertAt = clamp(
        typeof toIndex === "number" ? toIndex : list.length,
        0,
        list.length
      );
      list.splice(insertAt, 0, item);

      const ops = list.map((doc: any, idx: number) => ({
        updateOne: {
          filter: { _id: doc._id },
          update: { $set: { order: idx } },
        },
      }));

      await CandidateModel.bulkWrite(ops, { ordered: false });
      return res.json({ ok: true });
    } else {
      const src = await CandidateModel.find({ stage: fromStage })
        .sort({ order: 1 })
        .lean();
      const dst = await CandidateModel.find({ stage: toStage })
        .sort({ order: 1 })
        .lean();

      const srcIndex = src.findIndex((x: any) => String(x._id) === String(id));
      if (srcIndex === -1)
        return res
          .status(404)
          .json({ message: "Candidate not found in source stage" });

      const [item] = src.splice(srcIndex, 1);
      const insertAt = clamp(
        typeof toIndex === "number" ? toIndex : dst.length,
        0,
        dst.length
      );
      dst.splice(insertAt, 0, item);

      const ops = [
        // reindex source
        ...src.map((doc: any, idx: number) => ({
          updateOne: {
            filter: { _id: doc._id },
            update: { $set: { order: idx } },
          },
        })),
        // reindex dest; also set stage for the moved candidate
        ...dst.map((doc: any, idx: number) => ({
          updateOne: {
            filter: { _id: doc._id },
            update: {
              $set: {
                order: idx,
                ...(String(doc._id) === String(id) ? { stage: toStage } : {}),
              },
            },
          },
        })),
      ];

      await CandidateModel.bulkWrite(ops, { ordered: false });
      return res.json({ ok: true });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Failed to move candidate" });
  }
};
