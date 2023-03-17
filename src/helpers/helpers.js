export function test() {
	// sadasd
}
export function elconsole(elparam) {
	// console.debug( `-> ${elparam}` );
	// console.debug( "CLICK" );
}

// export async function ladefinicion( palabrabuscada ) {
// 	console.debug( `lo buscado: ${palabrabuscada}` );
// 	const url = `https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=${palabrabuscada}&explaintext=1&exsectionformat=plain&format=json&lang=es`;
// 	// const res = await fetch(url);
// 	// const data = await res.json();
// 	console.debug( url );
// 	// return palabrabuscada;
// }
function traigo(buscar) {
	return new Promise((resolve) => {
		setTimeout(() => {
			// const url = `https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=${buscar}&explaintext=1&exsectionformat=plain&format=json&lang=es`;
			const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${buscar}`;
			fetch(url).then((x) => x.json()).then((x) => {
				resolve(x);
			});
		}, 2000);
	});
}

async function leimprimi(buscanding) {
	console.debug( "llamanding" );
	const resultado = await traigo(buscanding);
	// console.debug( `Definicion? ${resultado}` );
	console.debug( resultado );
	// console.debug( resultado.meanings.definitions.definition );
	console.debug( resultado[0].meanings[0].definitions[0].definition );
	console.debug( "cortanding" );
	const laadefinicion = resultado[0].meanings[0].definitions[0].definition;
	return laadefinicion;
	// return resultado;
}

export async function getServerSideProps() {
	const res = await fetch("https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&titles=pizza&explaintext=1&exsectionformat=plain&format=json&lang=es");
	const data = await res.json();

	const testdefinicion = data.query.pages[Object.keys(data.query.pages)].extract;

	return {
		props: {
			todos: data,
			testdefinicion,
		},
	};
}
