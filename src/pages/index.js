import Head from "next/head";
import Image from "next/image";
// import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
// import buscador from "../helpers/helpers";
import buscador from "@/helpers/helpers";

// const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
	const res = await fetch("https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=pizza&explaintext=1&exsectionformat=plain&format=json&lang=es");
	// const res = await fetch("https://jsonplaceholder.typicode.com/todos");
	const data = await res.json();

	return {
		props: {
			todos: data,
		},
	};
}

export default function Home({ todos }) {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<section id="buscador">
				<h1 className={styles.test}>titulo</h1>
				<input type="text" onChange={(evt) => { buscador( evt.target.value ); }} />
				{todos?.length === 0 ? (
					<div>Loading ...</div>
				) : (
					// todos?.map((todo) => (
					// 	<div key={todo.id}>{todo.title}</div>
					// ))
					<div>si</div>
				)}
				{/* {console.debug( todos )} */}
				{console.debug( todos.query.pages )}
			</section>

		</>
	);
}
