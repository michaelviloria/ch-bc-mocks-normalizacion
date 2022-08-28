import util from "util";
import chatSchema from "../schemas/chatSchema.js";
import { normalize, denormalize } from "normalizr";

const normalizrMessages = (messages) => {
	console.log("<---------- Mensajes Firebase ---------->");
	console.log(messages);
	console.log("<---------- Mensajes en Array ---------->");
	const post = { id: "1", messages: messages };
	console.log(post);
	console.log("<---------- Objeto Original Length ---------->");
	console.log(JSON.stringify(messages).length);

	console.log("<---------- Objeto Normalizado ---------->");
	const normalizedData = normalize(post, chatSchema);
	console.log(util.inspect(normalizedData, false, 14, true));
	console.log(JSON.stringify(normalizedData).length);

	console.log("<---------- Objeto Denormalizado ---------->");
	const denormalizedData = denormalize(
		normalizedData.result,
		chatSchema,
		normalizedData.entities
	);
	console.log(JSON.stringify(denormalizedData).length);
};

export default normalizrMessages;
