import { useEffect, useState } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import { mododarkmode, callAPIreloaded } from "@/helpers/helpers";
import styles from "@/styles/Home.module.css";

function Significado(props) {
	const { estado } = props;
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
			{
				estado
					? (
						estado?.map((significado) => {
							const {
								audio, pronunciacion,
							} = significado;
							return (
								<ul key={pronunciacion} style={{ marginTop: "20px" }}>
									<li style={{ listStyle: "none", display: "flex", alignItems: "flex-start" }}>
										<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
										<sterong style={{ marginRight: "10px" }}>DEF.</sterong>{pronunciacion}
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
	);
}

function Titulo(props) {
	const { estado } = props;
	return (
		<h1 className={styles.palabraBuscada}>
			{ estado && <span className={styles.arrowright} /> }
			<span style={{ fontSize: "3em" }}>{estado}</span>
		</h1>
	);
}

function Darkmode() {
	const [darkmode, setdarkmode] = useState("desactivado");

	useEffect(() => {
		if ( localStorage.getItem("diccionario_darkmode") ) {
			if ( localStorage.getItem("diccionario_darkmode") === "activado" ) {
				mododarkmode("activar");
				setdarkmode("activado");
			} else {
				mododarkmode("desactivar");
				setdarkmode("desactivado");
			}
		} else {
			localStorage.setItem("diccionario_darkmode", "desactivado");
		}
	}, []);

	return (
		<button
			style={{ cursor: "pointer" }}
			type="button"
			className="activadarkmode"
			onClick={
				() => {
					if ( darkmode === "activado" ) {
						mododarkmode("desactivar");
						setdarkmode("desactivado");
					} else {
						mododarkmode("activar");
						setdarkmode("activado");
					}
				}
			}
		>Activar Darkmode
		</button>
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

			<main id={styles.buscador}>
				<Titulo estado={palabra} />
				<div className={styles.contenedor}>
					<input
						className={styles.inputbuscar}
						type="text"
						onChange={(evt) => {
							setpalabra(evt.target.value);
						}}
					/>
					<button
						className={styles.botonBuscar}
						type="button"
						onClick={
							async () => {
								const respuesta = await callAPIreloaded(palabra);
								setdefinicion(respuesta);
							}
						}
					>BUSCAR
					</button>
				</div>
				<Significado estado={definicion} />
			</main>
		</>
	);
}
