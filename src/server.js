import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";

const app = express();
export const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

import router from "./routes/routes.js";

app.use(express.static("./public"));
app.use("/api/productos", router);
app.use("/api/productos-test", routerTest);

// <------------------------- Configuracion de EJS ------------------------->

app.set("view engine", ".ejs");
app.set("views", "./src/views");

// <------------------------- Clases ------------------------->
import { optionsMySQL, optionsSQLite } from "./DB/options.js";

import Contenedor from "./contenedor.js";
const contenedor = new Contenedor({
	options: optionsMySQL.options,
	table: optionsMySQL.table,
});

import Chat from "./chat.js";
import routerTest from "./routes/routes-test.js";
const chat = new Chat({
	options: optionsSQLite.options,
	table: optionsSQLite.table,
});

// <------------------------- Sockets ------------------------->

io.on("connection", async (socket) => {
	console.log("Un cliente se ha conectado");
	const responseProducts = await contenedor.getAll();
	socket.emit("products", responseProducts);
	const responseChats = await chat.getAll();
	socket.emit("messages", responseChats);

	socket.on("new-message", async (data) => {
		await chat.save(data);
		const response = await chat.getAll();
		io.sockets.emit("messages", response);
	});

	socket.on("new-product", async (data) => {
		await contenedor.save(data);
		const response = await contenedor.getAll();
		io.sockets.emit("products", response);
	});
});
