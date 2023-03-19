import { useEffect, useState } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import { mododarkmode, callAPIreloaded } from "@/helpers/helpers";
import styles from "@/styles/Home.module.css";

// const inter = Inter({ subsets: ["latin"] });

// export async function getServerSideProps() {
// 	const res = await fetch("https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=pizza&explaintext=1&exsectionformat=plain&format=json&lang=es");
// 	const data = await res.json();

// 	const testdefinicion = data.query.pages[Object.keys(data.query.pages)].extract;

// 	return {
// 		props: {
// 			todos: data,
// 			testdefinicion,
// 		},
// 	};
// }

function Significado(props) {
	const { estado } = props;
	return (
		<div className="significado">
			{
				estado
					? (
						estado?.map((significado) => {
							console.debug( "elsigni" );
							console.debug( significado );
							const {
								audio, pronunciacion,
							} = significado;
							return (
								<ul key={audio} style={{ marginTop: "20px" }}>
									<li style={{ listStyle: "none", display: "flex", alignItems: "flex-start" }}>
										<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
										<strong style={{ marginRight: "10px" }}>DEF.</strong>{pronunciacion}
									</li>
									<li style={{ listStyle: "none", display: "flex", alignItems: "flex-start" }}>
										<strong style={{ marginRight: "10px" }}>EJEM.</strong>
										<audio controls>
											<track kind="captions" />
											<source src={audio} />
										</audio>
									</li>
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

export default function Home() {
	const [palabra, setpalabra] = useState();
	const [definicion, setdefinicion] = useState();
	const [darkmode, setdarkmode] = useState("desactivado");

	return (
		<>
			<Head>
				<title>DICCIONARIO</title>
				<meta name="description" content="Somos un diccionario mas" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<button
				style={{ cursor: "pointer" }}
				type="button"
				className="activadarkmode"
				onClick={
					/* eslint-disable */
					() => {
						darkmode === "activado"
							? (
								mododarkmode("desactivar"),
								setdarkmode("desactivado")
							) : (
								mododarkmode("activar"),
								setdarkmode("activado")
							);
					}
					/* eslintr-enable */
				}
			>Activar Darkmode
			</button>

			<section id={styles.buscador}>
				<Titulo estado={palabra} />
				<div className={styles.contenedor}>
					<input
						className={styles.inputbuscar}
						type="text"
						onChange={(evt) => {
							setpalabra(evt.target.value);
						}}
					/>
					<button className={styles.botonBuscar} type="button" onClick={
						async () => {
							const respuesta = await callAPIreloaded(palabra);
							console.debug( `traje respuesta` );
							console.debug( respuesta );
							console.debug( `fin respuesta` );
							setdefinicion(respuesta);
						}
					}>BUSCAR</button>
				</div>
				<Significado estado={definicion} />
			</section>
		</>
	);
}
