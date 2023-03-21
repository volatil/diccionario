import { useState } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import { callAPIreloaded } from "@/helpers/helpers";
import Header from "@/components/Header/Header";
import Buscador from "@/components/Buscador/Buscador";

import css from "@/styles/Buscador.module.css";
import cssSigni from "@/styles/Significado.module.css";

function Significado(props) {
	const { estado } = props;

	if ( estado ) {
		// si no hay estado imprime mensaje default
		if ( typeof estado === "boolean" ) {
			return (
				<div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
					<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
					<p>No se encontraron definiciones</p>
				</div>
			);
		}

		// // LOS SINONIMOS
		let arrSinonimos = [];
		if ( estado ) {
			for ( let count = 0; count <= estado.length - 1; count++ ) {
				const sinonimo = estado[count].sinonimos;
				if ( sinonimo ) {
					arrSinonimos.push(sinonimo);
				}
			}
			arrSinonimos = [...new Set(arrSinonimos)];
		}

		return (
			<div className="significado">
				<div className="pronunciacion">
					{
						estado
							? (
								estado?.map((elsigni) => {
									const key = elsigni.pronunciacion + elsigni.definicion;
									const { audio, pronunciacion } = elsigni;
									return (
										<ul data-key={key} key={key} style={{ marginTop: "20px" }}>
											<li style={{ listStyle: "none", display: "flex", alignItems: "flex-start" }}>
												<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
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
							) : (
								<div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
									<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
									<p>...</p>
								</div>
							)
					}
				</div>
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
				<div className="definicion" style={{ marginTop: "20px" }}>
					{
						estado
							&& estado.map((ladef, index) => {
								const key = index + ladef.pronunciacion + ladef.definicion;
								const { definicion, ejemplo } = ladef;
								return (
									<ul data-key={key} key={key} style={{ marginBottom: "20px" }}>
										<li>{definicion}</li>
										<span style={{ color: "#a7a7a7", marginTop: "10px", display: "block" }}>{ejemplo}</span>
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
			<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
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
					<button className={css.botonBuscar} type="button" onClick={async () => { const palabra = document.querySelector("#inputBUSCADOR").value; const respuesta = await callAPIreloaded(palabra); setdefinicion(respuesta); }}>BUSCAR </button>
				</Buscador>

				<Significado estado={definicion} />
			</main>
		</>
	);
}
