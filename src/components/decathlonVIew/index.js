import { h, Component } from 'preact';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import LogoImage from './images/logo.png';
import Connection from './utils'

export default class Home extends Component {


	componentDidMount() {
		let r = new Connection()
		r.connect()
		r.data.then(e=>{
			console.log(e)
		})
	}


	render({tag}) {
		return (
			<div class={style.view}>
				<div class={style.sectionOne}>
					<div class={style.headerView}>
						<img 
							src={LogoImage} 
							alt="Logo"
							class={style.logo} /> 
						<p>{tag}</p>
					</div>
					<p class={style.porcent}>84%</p>
					<div class={style.infoView}>
						<i class={style.infoText}>
							DEPORTISTAS <span>SATISFECHOS</span> 
						</i>
						<p class= {style.subInfoText}>
							BASADO EN 143 OPINIONES <span> DE LOS ULTIMOS 30 DIAS</span> 
						</p>
					</div>
					<p class={style.andYou}> Y TU ?</p>
				</div>
				
				<div class={style.info}>
					<div class={style.infoClient}>
						<div class={style.name}>
							<p>PABLO el 19/02/2020</p>
						</div>
						<div class={style.description}>
							<p>Me encanta la tienda y todos los productos, y ni hablar del excelente servicio</p>
						</div>
					</div>
					<hr class={style.line}/>
					<div class={style.infoClient}>
						<div class={style.about}>
							<p>DEPORTISTAS SATISFECHOS ES NUESTRA PROFESIÓN</p>
						</div>
					</div>
				</div>

			</div>
		);
	}
}
