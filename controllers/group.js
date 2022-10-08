import client from "../whatsapp/Client.js";
import fs from "fs";
import csv from "csv-parser";

async function createGroup(req, res) {
  try {
    let arr = [];
    fs.createReadStream(req.file.path)
      .pipe(csv({}))
      .on("data", (data) => {
        arr.push(data.PhoneNumber);
      })
      .on("end", async () => {
        arr = [...new Set(arr)];
        const groupChatName = req.body.groupName; //Group name
        const groupChatParticipants = arr; //array of phone NUmbers

        groupChatParticipants.forEach((number, i) => {
          if (number.length === 10) {
            number = "91" + number + "@c.us";
            groupChatParticipants[i] = number;
          } else if (number.startsWith("+")) {
            number = number.split("+")[1];
            groupChatParticipants[i] = number;
          } else {
            number = number + "@c.us";
            groupChatParticipants[i] = number;
          }
        });
        // const groupChat = await client.createGroup(
        //   groupChatName,
        //   groupChatParticipants
        // );

        res.json(groupChatParticipants);
      });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

export { createGroup };
