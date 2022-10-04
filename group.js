const qrcode = require("qrcode-terminal");
const userModel = require("./models/userModel");
const connect = require("./dbConnection/connect");
var cron = require("node-cron");

const { Client, LocalAuth, GroupChat } = require("whatsapp-web.js");

require("dotenv").config();

const client = new Client();
//   authStrategy: new LocalAuth(),

client.on("qr", async (qr) => {
  qrcode.generate(qr, { small: true });
  console.log("db Connected");
});

client.on("ready", async () => {
  console.log("Client is ready!");

  const groupChatName = ""; //Group name
  const groupChatParticipants = []; //array of phone NUmbers

  groupChatParticipants.forEach((number, i) => {
    if (number.length === 10) {
      number = "91" + number + "@c.us";
      groupChatParticipants[i] = number;
    } else if (number.startsWith("+")) {
      number = number.split("+")[1];
    } else {
      number = number + "@c.us";
    }
  });

  const groupChat = await client.createGroup(
    groupChatName,
    groupChatParticipants
  );
  console.log(groupChat);
});

client.initialize();
