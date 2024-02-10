import express from "express";
import {createProfile, getProfiles, updateProfile, deleteProfile, getProfilebyuser} from "../Controllers/Profile.js";

const router = express.Router();

router.post("/", createProfile);
router.get("/", getProfiles);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);
router.get("/:id", getProfilebyuser);

export default router;