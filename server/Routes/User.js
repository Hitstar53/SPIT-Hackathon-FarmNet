import express from "express";
import { createUser, getUsers, updateUser, deleteUser, getUserByAadhar, getUserByphone } from "../Controllers/User.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.get("/:aadhar", getUserByAadhar);
router.get("/:phoneno", getUserByphone);

export default router;
