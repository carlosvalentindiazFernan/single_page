import './style';
import { Component } from 'preact';
import Home from './components/decathlonVIew'
export default class App extends Component {
	render() {
		return (
			<div>
				<Home></Home>
			</div>
		);
	}
}
