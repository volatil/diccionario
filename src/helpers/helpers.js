export function test() {
	// sadasd
}
export function elconsole(elparam) {
	// console.debug( `-> ${elparam}` );
	// console.debug( "CLICK" );
}

export const callAPI = async function (buscado) {
	try {
		const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${buscado}`);
		const data = await res.json();
		const significado = data[0].meanings[0].definitions[0].definition;
		return significado;
	} catch (err) {
		console.debug("hubo un error !");
		console.debug(err);
		return err;
	}
};
