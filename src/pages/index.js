import { useEffect, useState } from "react";
import Head from "next/head";
// import Image from "next/image";
// import { Inter } from "next/font/google";
import { mododarkmode } from "@/helpers/helpers";
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
						estado.map((significado) => {
							return (
								<div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
									<img style={{ width: "20px", margin: "0 10px 10px 0" }} src="/assets/svg/definicion.svg" alt="definicion" />
									<p key={significado}>{significado}</p>
								</div>
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

export default function Home() {
	const [palabra, setpalabra] = useState();
	const [definicion, setdefinicion] = useState();
	const [darkmode, setdarkmode] = useState("desactivado");

	const callAPIreloaded = async (lapalabra) => {
		try {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${lapalabra}`,
			);
			const data = await res.json();

			const todoslossignificados = data[0].meanings[0].definitions;
			const lossignificadosarray = [];
			for ( let count = 0; count <= todoslossignificados.length - 1; count++ ) {
				const elsigni = data[0].meanings[0].definitions[count].definition;
				lossignificadosarray.push( elsigni );
			}
			setdefinicion(lossignificadosarray);
		} catch (err) {
			console.debug("ERROOOOOOOOR !");
			console.debug(err);
		}
	};

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
				<h1 className={styles.palabraBuscada}>
					{ palabra && <span className={styles.arrowright} /> }
					<span style={{ fontSize: "3em" }}>{palabra}</span>
				</h1>
				<div className={styles.contenedor}>
					<input
						className={styles.inputbuscar}
						type="text"
						onChange={(evt) => {
							setpalabra(evt.target.value);
						}}
					/>
					<button className={styles.botonBuscar} type="button" onClick={() => { callAPIreloaded(palabra); }}>BUSCAR</button>
				</div>
				<Significado estado={definicion} />
			</section>
		</>
	);
}
