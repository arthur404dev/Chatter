import { io } from "../index";
import Chat from "../models/Chat";
import { connect } from "../config/db.config";

const DB_Name = process.env.DB_NAME;

const handler = socket => {
  socket.on("Input Chat Message", msg => {
    connect(DB_Name).then(db => {
      try {
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
      } catch (error) {
        console.error(error);
      }
    });
  });
};

export default handler;