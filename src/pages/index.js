import { useState, useEffect } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import { callAPIreloaded, playPronunciacion, play } from "@/helpers/helpers";
import Header from "@/components/Header";
import Buscador from "@/components/Buscador";

import cssBuscador from "@/styles/Buscador.module.css";
import cssSigni from "@/styles/Significado.module.css";

function Significado(props) {
	const { estado } = props;

	if ( estado ) {
		const palabra = estado[0].word;
		const pronunciacion = estado[0].pronunciacion;

		let arrSinonimos = [];
		let arrDefinicion = [];
		let arrAudios = [];
		for ( let count = 0; count <= estado.length - 1; count++ ) {
			const sinonimo = estado[count].sinonimos;
			const definicion = estado[count].definicion;
			const audio = 	estado[count].audio;

			if ( sinonimo ) {
				arrSinonimos.push(sinonimo);
			}
			if ( definicion ) {
				arrDefinicion.push(definicion);
			}
			if ( audio ) {
				arrAudios.push(audio);
			}
		}

		arrSinonimos = [...new Set(arrSinonimos)];
		arrDefinicion = [...new Set(arrDefinicion)];
		arrAudios = [...new Set(arrAudios)];

		return (
			<div className="significado">
				<div className={cssSigni.audioCajita}>
					<div>
						<h2 className={cssSigni.palabraBuscada}>{palabra}</h2>
						<p className={cssSigni.pronunciacion}>{pronunciacion}</p>
					</div>
					<div className={cssSigni.ladoAudio}>
						<button className={cssSigni.botonReproduceAudio} type="button" onClick={() => { playPronunciacion(); }}>
							<img src="assets/svg/audio.svg" alt="reproducir audio" />
						</button>

						<audio id="elaudio" key={arrAudios[0]} controls>
							<track kind="captions" />
							<source src={arrAudios[0]} />
						</audio>
					</div>
				</div>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				{/* <div className="pronunciacion">
					{
						estado?.map((elsigni) => {
							const key = elsigni.pronunciacion + elsigni.definicion;
							const { audio, pronunciacion } = elsigni;
							return (
								<ul data-key={key} key={key} style={{ marginTop: "20px" }}>
									<li style={{ listStyle: "none", display: "flex", alignItems: "flex-start" }}>
										<strong style={{ marginRight: "10px" }}>PRONUN.</strong>{pronunciacion}
									</li>
									{
										audio
											&& (
												<li style={{ listStyle: "none", display: "flex", alignItems: "flex-start" }}>
													<strong style={{ marginRight: "10px" }}>EJEM.</strong>
													<audio controls>
														<track kind="captions" />
														<source src={audio} />
													</audio>
												</li>
											)
									}
								</ul>
							);
						})
					}
				</div> */}
				<div className="sinonimos">
					<p>Sinonimos:{" "}
						{
							arrSinonimos?.map((elsinon) => {
								return (
									<span className={cssSigni.spanlossinonimos} key={elsinon}>{elsinon}</span>
								);
							})
						}
					</p>
				</div>
				<div className="definicion" style={{ marginTop: "20px", letterSpacing: "0.05em" }}>
					<h2>DEFINICION</h2>
					{
						arrDefinicion.map((definicion, index) => {
							return (
								<ul data-key={definicion} key={definicion} style={{ marginBottom: "20px" }}>
									<li>{definicion}</li>
								</ul>
							);
						})
					}
				</div>
			</div>
		);
	}

	return (
		<div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
			<p>No se encontraron definiciones</p>
		</div>
	);
}

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
