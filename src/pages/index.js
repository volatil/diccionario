import { useState, useEffect } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import { callAPIreloaded } from "@/helpers/helpers";
import Header from "@/components/Header";
import Buscador from "@/components/Buscador";
import Significado from "@/components/Significado";

import cssBuscador from "@/styles/Buscador.module.css";

export default function Home() {
	const [definicion, setdefinicion] = useState();

	return (
		<>
			<Head>
				<title>DICCIONARIO</title>
				<meta name="description" content="Somos un diccionario mas" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<Header />

				<Buscador>
					<button className={cssBuscador.botonBuscar} type="button" onClick={async () => { const palabra = document.querySelector("#inputBUSCADOR").value; const respuesta = await callAPIreloaded(palabra); setdefinicion(respuesta); }}>
						<img className={cssBuscador.isotipo} src="/assets/svg/buscaricono.svg" alt="buscar" />
					</button>
				</Buscador>

				<Significado estado={definicion} />
			</main>
		</>
	);
}
