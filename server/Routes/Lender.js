import express from "express";
import {
  getAllLenders,
  getLenderbyEmail,
  createLender,
  updateLender,
  deleteLender,
  loginLender
  
} from "../Controllers/Lenders.js";

const router = express.Router();

router.get("/", getAllLenders);
router.get("/:email", getLenderbyEmail);
router.post("/", createLender);
router.patch("/:id", updateLender);
router.delete("/:id", deleteLender);
router.post("/login", loginLender);


export default router;