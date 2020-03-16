import { io } from "../index";
import Chat from "../models/Chat";
import { stockBot } from "./bots/stockBot";
// import { connect } from "../config/db.config";

const DB_Name = process.env.DB_NAME;

const handler = socket => {
  socket.on("Input Chat Message", async msg => {
    // connect(DB_Name).then(db => { - Connection to the DB beign done on server startup, this feature would be good for multiple databases
    try {
      // Check if the message is code:
      const msgLower = msg.chatMessage.toLowerCase();
      // Check which bot to trigger:
      if (msgLower.startsWith("/stock")) {
        // Call the Bot:
        const botDoc = await stockBot(msg.chatMessage);
        return io.emit("Output Chat Message", botDoc);
      } else {
        // That's a normal chat message
        let chat = new Chat({
          message: msg.chatMessage,
          sender: msg.userId,
          type: msg.type
        });

        chat.save((err, doc) => {
          console.log(doc);
          if (err) return res.json({ success: false, err });

          Chat.find({ _id: doc._id })
            .populate("sender")
            .exec((err, doc) => {
              return io.emit("Output Chat Message", doc);
            });
        });
      }
    } catch (error) {
      console.error(error);
    }
    // });
  });
};

export default handler;
