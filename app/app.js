import React from 'react';
import Header from './components/Header';
import ContactList from './components/ContactList';
import AutoComplete from './components/AutoComplete';
import MultiselectComponent from './components/MultiselectComponent';
import Mui from 'material-ui';
let ThemeManager = new Mui.Styles.ThemeManager();

class TodoApp extends React.Component {
	getChildContext() { 
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  }

	render () {
		return (
			<div>
				<Header></Header>
				<AutoComplete></AutoComplete>
				<MultiselectComponent></MultiselectComponent>
				<ContactList></ContactList>
			</div>
		)
	}
}

TodoApp.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render(<TodoApp />, document.getElementById('todo-container'));

export default TodoApp;