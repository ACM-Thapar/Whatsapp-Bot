const qrcode = require('qrcode-terminal');
const userModel = require('./models/userModel')
const connect = require('./dbConnection/connect')
const { Client } = require('whatsapp-web.js');
const client = new Client();
require('dotenv').config()

client.on('qr', async qr => {
    qrcode.generate(qr, { small: true });
    await connect(process.env.mongoUri)
    console.log("db Connected")

});

// client.on('ready', async () => {

//     console.log('Client is ready!');

//     const number = "+919324067124";
//     await userModel.create({ name: "Rashii", phoneNo: number })
//     // Your message.
//     const text = "Hey dumbo";

//     // Getting chatId from the number.
//     // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
//     const chatId = number.substring(1) + "@c.us";

//     // Sending message.
//     client.sendMessage(chatId, text);
// });
client.on('ready', async () => {

    console.log('Client is ready!');

    // greeting array
    var greetings = ["hbd", "happy birthday", "Wishing you a prosperous year ahead",
        "hope you got the money", "party when ?", "happy bday"];

    var randGreet = greetings[Math.floor(Math.random() * greetings.length)];
    // const number = "+919136371156";
    // await userModel.create({ name: "samikk", phoneNo: number })
    // const { phoneNo, name, date } = await userModel.findOne({ name: "Rashii" })
    // const number = "+919324067124";

    let presentDate = new Date();
    const data = await userModel.find()
    let allDate = data.map(date => date.date)

    for (let i = 0; i < allDate.length; i++) {
        if (allDate[i].getMonth() === presentDate.getMonth() && allDate[i].getDate() === presentDate.getDate()) {
            const text = `Hey ${data[i].name}`;

            const chatId = data[i].phoneNo.substring(1) + "@c.us";
            // console.log(data.allDate[i])
            // console.log(allDate[i], " ", data[i]);


            client.sendMessage(chatId, text);
        } else {
            console.log("not same")
        }
    }


    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
});
// client.on('message', msg => {
//     if (msg.body) {
//         msg.reply('pong');
//     }
// });


// client.on('ready', async () => {
//     setInterval(async () => {
//         try {

//             console.log('Client is ready!');

//             const number = "+919324067124";

//             // Your message.
//             const text = "Hey dumbo";
//             await userModel.create({ name: "Rashii", phoneNo: number })

//             // Getting chatId from the number.
//             // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
//             const chatId = number.substring(1) + "@c.us";

//             // Sending message.
//             client.sendMessage(chatId, text);
//         } catch (error) {

//         }
//     }, 5000)
// });


client.initialize();