import { Component } from 'preact';
import Home from './components/decathlonVIew'
import Connection from './utils'

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sastifaction: 100,
			comments: []
		};
	}	

	componentDidMount() {
		let conx = new Connection()
		conx.connect()
		conx.data.then(e =>{

			if(Connection.isSuccess(e)){

				var [sastifactionRank, componentsPeople] = e											
				const {data: {stats: {reviewNote}}} = sastifactionRank;
				console.log(componentsPeople.data)
				this.setState({
					sastifaction: Math.trunc(reviewNote.satisfactionRate * 100),
					comments: componentsPeople.data
				});
				
	
			}
		})
	}


	render({},{sastifaction,comments}) {
		return (
			<div>
				{ comments.map( comment => (
					<Home  
						tag="MXMSL!" 
						sastifaction={sastifaction}
						name={comment.firstname}
						description={comment.body}
					/>
					)) 
				}	
			</div>
		);
	}
}
