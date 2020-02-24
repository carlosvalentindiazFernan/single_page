import { Component } from 'preact';
import Home from './components/decathlonVIew'
export default class App extends Component {
	render() {
		return (
			<div>
				<Home  tag="me"></Home>
			</div>
		);
	}
}
