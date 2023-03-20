export function mododarkmode(estado) {
	console.debug( "me desactivaste pelotudo !" );

	if ( estado === "activar" ) {
		const cambioOSCURO = document.querySelector("body");
		cambioOSCURO.classList.add("darkmode");
		localStorage.setItem("diccionario_darkmode", "activado");
	} else {
		const cambioOSCURO = document.querySelector("body");
		cambioOSCURO.classList.remove("darkmode");
		localStorage.setItem("diccionario_darkmode", "desactivado");
	}
	// if ( estado === "activar" ) {
	// 	const miHTML2 = document.querySelector("html");
	// 	miHTML2.classList.add("darkmode");
	// 	localStorage.setItem("diccionario_darkmode", "activado");
	// } else {
	// 	const miHTML2 = document.querySelector("html");
	// 	miHTML2.classList.remove("darkmode");
	// 	localStorage.setItem("diccionario_darkmode", "desactivado");
	// }
}

export const callAPIreloaded = async function (lapalabra) {
	const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${lapalabra}`;
	const res = await fetch( api );
	const data = await res.json();
	if ( data.title ) {
		return false;
	}

	const todo = [];
	// AGREGA FONETICA
	for ( let count = 0; count <= data[0].phonetics.length - 1; count++ ) {
		todo.push({
			audio: data[0].phonetics[count].audio,
			pronunciacion: data[0].phonetics[count].text,
			definicion: data[0].meanings[0].definitions[count].definition,
			ejemplo: data[0].meanings[0].definitions[count].example,
			sinonimos: data[0].meanings[0].synonyms[count],
		});
	}

	// TEST lo pusheado al array
	// console.debug( todo );
	return todo;
};
