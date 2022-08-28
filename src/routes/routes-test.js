import express from "express";
const routerTest = express.Router();

import { faker } from "@faker-js/faker";

// <------------------------- Configuracion Rutas ------------------------->

routerTest.use(express.json());
routerTest.use(express.urlencoded({ extended: true }));

// <------------------------- Peticiones ------------------------->

const fakerProducts = () => {
	const nombres = [];
	const precios = [];
	const fotos = [];

	for (let i = 0; i < 5; i++) {
		nombres.push(faker.commerce.product());
		precios.push(faker.commerce.price(50, 500, 0, "$"));
		fotos.push(faker.image.imageUrl(100, 100, nombres[i], true));
	}
	return {
		nombres: nombres,
		precios: precios,
		fotos: fotos,
	};
};

routerTest.get("/", (req, res) => {
	res.render("testHome", { response: fakerProducts(), message: "ok" });
});

export default routerTest;
