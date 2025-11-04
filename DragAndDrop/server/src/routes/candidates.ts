import { Router } from "express";
import {
  getBoard,
  createCandidate,
  moveCandidate,
} from "../controllers/candidateController";

const router = Router();

router.get("/", getBoard); // GET /api/candidates
router.post("/", createCandidate); // POST /api/candidates
router.patch("/:id/move", moveCandidate); // PATCH /api/candidates/:id/move

export default router;
