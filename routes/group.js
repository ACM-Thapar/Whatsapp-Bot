import express from "express";
import { createGroup } from "../controllers/group.js";
import { upload } from "../middleware/uploads.js";
const router = express.Router();

router
  .route("/create")
  .post(upload.single("data"), createGroup)
  .get((_, res) => {
    res.json("yoo");
  });

export { router };
