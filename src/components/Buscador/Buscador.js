function Buscador(props) {
	const { children } = props;
	return (
		<div className="contenedor">
			<input className="inputbuscar" type="text" />
			{children}
		</div>
	);
}
export default Buscador;
