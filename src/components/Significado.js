import { playPronunciacion } from "@/helpers/helpers";
import cssSigni from "@/styles/Significado.module.css";

function Titulo(props) {
	const { titulo } = props;
	return (
		<h3 style={{
			display: "flex", alignItems: "center", height: "40px", marginBottom: "20px",
		}}
		>
			<span>{titulo}</span>
			<span style={{
				height: "2px", width: "100%", display: "block", background: "#444", marginLeft: "20px",
			}}
			/>
		</h3>
	);
}

function Significado(props) {
	const { estado } = props;

	if ( estado ) {
		// console.debug( estado );
		const data = {
			palabra: estado[0].palabra,
			pronunciacion: estado[1].pronunciacion,
			audio: estado[2].audio,
			definiciones: estado[3].definiciones,
			sinonimos: estado[4].sinonimos,
		};
		// console.debug( data.audio );

		return (
			<div className="significado">
				<div className={cssSigni.audio}>
					<div>
						<h2 className={cssSigni.palabraBuscada}>{data.palabra}</h2>
						<p className="pronunciacion">{data.pronunciacion}</p>
					</div>
					{
						data.audio
							&& (
								<div className={cssSigni.ladoAudio}>
									<button className={cssSigni.botonReproduceAudio} type="button" onClick={() => { playPronunciacion(); }}>
										<img src="assets/svg/audio.svg" alt="reproducir audio" />
									</button>
									<audio id="elaudio" key={data.audio} controls>
										<track kind="captions" />
										<source src={estado[2].audio} />
									</audio>
								</div>
							)
					}
				</div>
				<div className={cssSigni.definiciones}>
					<Titulo titulo="noun" />
					<ul style={{ marginBottom: "20px" }}>
						{
							data.definiciones.map((definicion) => {
								return (
									<li key={definicion}>{definicion}</li>
								);
							})
						}
					</ul>
				</div>
				<div className={cssSigni.sinonimos}>
					{
						data.sinonimos.length >= 1
							&& (
								<p className="sinonimos">Synonyms:{" "}
									{
										data.sinonimos?.map((elsinon) => {
											return (
												<span key={elsinon}>{elsinon}</span>
											);
										})
									}
								</p>
							)
					}
				</div>
				{/* <div className={cssSigni.verbos}>
					<Titulo titulo="verb" />
					<ul style={{ marginBottom: "20px" }}>
						{
							arrVerbos.map((values, lakey) => {
								const key = values + lakey;
								return (
									<li key={key}>
										<span>{values}</span>
									</li>
								);
							})
						}
					</ul>
				</div> */}
				<br />
				<br />
				<br />
				<br />
			</div>
		);
	}

	return (
		<div style={{ display: "flex", alignItems: "flex-start", marginTop: "20px" }}>
			<p>{" "}</p>
		</div>
	);
}
export default Significado;
