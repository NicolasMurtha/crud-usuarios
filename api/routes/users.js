import express from "express";
import {addUser, deleteUser, getUsers, updateUser} from "../controllers/user.js";

const router = express.Router();

router.get("/", getUsers);

router.delete("/:id", deleteUser);

router.post("/", addUser);

router.put("/:id", updateUser);

export default router;