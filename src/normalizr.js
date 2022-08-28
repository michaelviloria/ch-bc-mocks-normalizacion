import util from "util";
import { normalize, denormalize, schema } from "normalizr";
import { faker } from "@faker-js/faker";

const authorSchema = new schema.Entity("author");
const messageSchema = new schema.Entity("messages", { author: authorSchema });
const chatSchema = new schema.Entity("chat", { messages: [messageSchema] });

const fakerData = [];

for (let i = 0; i < 10; i++) {
	const data = {
		id: faker.datatype.uuid(),
		timestamp: faker.datatype.datetime(),
		author: {
			nombre: faker.name.firstName(),
			apellido: faker.name.lastName(),
			alias: `${faker.name.firstName()}${faker.name.lastName()}`,
			avatar: faker.image.avatar(),
			edad: faker.datatype.number({ min: 18, max: 70 }),
			id: faker.database.mongodbObjectId(),
		},
		text: faker.random.words(4),
	};
	fakerData.push(data);
}

console.log("<---------- Mensajes en Array ---------->");
const post = { id: "1", messages: fakerData };
console.log(post);
console.log("<---------- Objeto Original Length ---------->");
console.log(JSON.stringify(fakerData).length);

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
