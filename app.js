const qrcode = require('qrcode-terminal');
const userModel = require('./models/userModel')
const connect = require('./dbConnection/connect')
// const { Client } = require('whatsapp-web.js');
var cron = require('node-cron')

const { Client, LocalAuth, NoAuth } = require('whatsapp-web.js');

require('dotenv').config()


const client = new Client();

// const client = new Client({
//     authStrategy: new LocalAuth()
// });

client.on('qr', async qr => {
    qrcode.generate(qr, { small: true });
    await connect(process.env.mongoUri)
    console.log("db Connected")

});

client.on('ready', async () => {

    console.log('Client is ready!');

    // cron.schedule('* * * * *', async () => {  //every 5 minutes {working}
    // cron.schedule('59 59 */23 * * *', async () => { //every 24 hours {not tested}
    // cron.schedule('0 0 0 * * *', async () => { //every midnight {stack overflow}



    var greetings = ["hbd", "happy birthday", "Wishing you a prosperous year ahead",
        "hope you got the money", "party when ?", "happy bday"];

    var randGreet = greetings[Math.floor(Math.random() * greetings.length)];
    // await userModel.create({ name: "samikk", phoneNo: "+91........." })
    // const { phoneNo, name, date } = await userModel.findOne({ name: "XYZ" })

    let presentDate = new Date();
    const data = await userModel.find()
    let allDate = data.map(date => date.date)
    // console.log(`here +${presentDate.getSeconds()}+${presentDate.getMinutes()}`)

    for (let i = 0; i < allDate.length; i++) {
        if (allDate[i].getMonth() === presentDate.getMonth() && allDate[i].getDate() === presentDate.getDate()) {
            // const text = `Hey ${data[i].name}`;
            const text = randGreet + " @" + data[i].phoneNo;

            const chatId = data[i].phoneNo.substring(1) + "@c.us";
            // const id = "120363021716438327@g.us" //{abcd}
            const id = "120363041323908346@g.us" //{acm whatsapp bot}


            // const group = await client.getCommonGroups(id)
            // client.sendMessage(chatId, text);
            // console.log(group)
            const chat = await client.sendMessage(id, text);
            // console.log(chat)
        }
    }
    // const number = '+919324067124'
    // const chatId = number.substring(1) + "@g.us"
    // const chatId = "abcd@d.us"
    // const chatId = '918920321607-919810900338@g.us'
    // client.sendMessage(chatId, "HELLOOOO ");

});
// });


client.initialize();