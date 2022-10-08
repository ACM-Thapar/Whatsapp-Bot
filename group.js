import client from "./whatsapp/Client.js";

import qrcode from "qrcode-terminal";
import express from "express";
import "dotenv/config";

import { router as group } from "./routes/group.js";
import { createGroup } from "./controllers/group.js";
const app = express();
app.use(express.json());
app.get("/whatsapp-login", (req, res) => {
  client.on("qr", async (qr) => {
    qrcode.generate(qr, { small: true });
    console.log(qr);

    return res.json(qr);
  });
});
app.get("/", (_, res) => {
  res.json("Server is running.....");
});

client.on("ready", async () => {
  console.log("Client is ready!");
  app.use("/group", group);
});
client.initialize();

app.listen(5001, () => {
  console.log(`Server started on port `);
});
