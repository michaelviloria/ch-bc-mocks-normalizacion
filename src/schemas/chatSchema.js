import { schema } from "normalizr";

const authorSchema = new schema.Entity("author");
const messageSchema = new schema.Entity("messages", { author: authorSchema });
const chatSchema = new schema.Entity("chat", { messages: [messageSchema] });

export default chatSchema;
