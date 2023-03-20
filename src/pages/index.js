import { useState } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import { callAPIreloaded } from "@/helpers/helpers";
import Darkmode from "@/components/darkmode/Darkmode";

function Significado(props) {
	const { estado } = props;
	// console.debug( estado );
	if ( typeof estado === "boolean" ) {
		return (
			<div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
				<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
				<p>No se encontraron definiciones</p>
			</div>
		);
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
						estado?.map((elsinon) => {
							const { sinonimos } = elsinon;
							return (
								<span key={sinonimos}>{sinonimos}</span>
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

function Titulo(props) {
	const { estado } = props;
	return (
		<h1 className="palabraBuscada">
			{ estado && <span className="arrowright" /> }
			<span className="texto">{estado}</span>
		</h1>
	);
}

export default function Home() {
	const [palabra, setpalabra] = useState();
	const [definicion, setdefinicion] = useState();

	return (
		<>
			<Head>
				<title>DICCIONARIO</title>
				<meta name="description" content="Somos un diccionario mas" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Darkmode />

			<main id="buscador">
				<Titulo estado={palabra} />
				<div className="contenedor">
					<input className="inputbuscar" type="text" onChange={(evt) => { setpalabra(evt.target.value); }} />
					<button className="botonBuscar" type="button" onClick={async () => { const respuesta = await callAPIreloaded(palabra); setdefinicion(respuesta); }}>BUSCAR </button>
				</div>

				<Significado estado={definicion} />

			</main>
		</>
	);
}
