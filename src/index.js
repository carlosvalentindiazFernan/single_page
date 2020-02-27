import { Component } from 'preact';
import Home from './components/decathlonVIew'
import Connection from './utils'

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sastifaction: 100,
			opinions: 0,
			comment: {}
		};
	}	

	componentDidMount() {
		let conx = new Connection()
		conx.connect()
		conx.data.then(e =>{

			if(Connection.isSuccess(e)){

				var [sastifactionRank, componentsPeople] = e											

				if(Connection.isSuccess(sastifactionRank)){
					const {data: {stats: {reviewNote}}} = sastifactionRank;
					this.setState({
						sastifaction: Math.trunc(reviewNote.satisfactionRate * 100),
						opinions: reviewNote.totalReviews
					});	
				}

				if(Connection.isSuccess(componentsPeople)){
					this.handleComments(componentsPeople.data)
				}

			}
		});
	}

	handleComments(data){
		if(this.state.comment){
			this.setState({
				comment: Connection.getRamdomComment(data)					
			});
		}
		let intervalId = setInterval((timer)=>{
			this.setState({
				comment: Connection.getRamdomComment(data)					
			});
		} , 8000)
	
		this.setState({intervalId: intervalId});	
	}	

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId);
	 }
	 
	 
	render({},{sastifaction,comment,opinions}) {
		return (
			<div>
				<Home  
					tag="MXMSL!" 
					sastifaction={sastifaction}
					name={comment.firstname}
					description={comment.body}
					opinions={opinions}
					created = {Connection.parseDate(Date(comment.created_at))}
				/>
			</div>
		);
	}
}
