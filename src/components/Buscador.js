import css from "@/styles/Buscador.module.css";

function Buscador(props) {
	const { children } = props;
	return (
		<div id={css.buscador}>
			<input id="inputBUSCADOR" className={css.inputbuscar} type="text" />
			{children}
		</div>
	);
}
export default Buscador;
