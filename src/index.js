import { httpServer } from "./server.js";

// <------------------------- Configuracion Servidor ------------------------->

const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, () => {
	console.log(
		`Servidor HTTP con Websockets escuchando en el puerto ${
			connectedServer.address().port
		}`
	);
});

connectedServer.on("error", (error) =>
	console.log(`Error en servidor ${error}`)
);
