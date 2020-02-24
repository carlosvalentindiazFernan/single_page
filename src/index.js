import './style';
import { Component } from 'preact';
import Views from './components/decathlon_views'

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, World!</h1>
				<Views></Views>

			</div>
		);
	}
}
