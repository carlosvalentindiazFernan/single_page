import { Component } from 'preact';
import TopAppBar from 'preact-material-components/TopAppBar';
import Drawer from 'preact-material-components/Drawer';
import List from 'preact-material-components/List';
import Dialog from 'preact-material-components/Dialog';
import Switch from 'preact-material-components/Switch';
import Button from 'preact-material-components/Button';	
import 'preact-material-components/Switch/style.css';
import 'preact-material-components/Dialog/style.css';
import 'preact-material-components/Drawer/style.css';
import 'preact-material-components/List/style.css';
import 'preact-material-components/TopAppBar/style.css';


export default class Views extends Component {
	render() {
		return (
			<div>
				<h1>Views</h1>
				<Button ripple raised>
		          Flat button with ripple
        		</Button>				
			</div>
		);
	}
}
