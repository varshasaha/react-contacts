import React from 'react';
import { Table, TableHeader, TableRow, TableBody, TableRowColumn, TableHeaderColumn } from 'material-ui';
import AppAction from '../actions/AppAction';
import ContactStore from '../stores/ContactStore';

class ContactList extends React.Component {
	constructor () {
		super();
		this.state = { contacts: [] };
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount () {
		ContactStore.addChangeListener(this._onChange);
		AppAction.getContacts();
	}

	componentWillUnmount () {
		ContactStore.removeChangeListener(this._onChange);	
	}

	_onChange () {
		this.setState({ contacts: ContactStore.getContacts()});
	}

	render () {
		return (
			<div className="contact-list">
				<Table>
				  <TableHeader>
				    <TableRow>
				      <TableHeaderColumn>Name</TableHeaderColumn>
				      <TableHeaderColumn>Contact No</TableHeaderColumn>
				    </TableRow>
				  </TableHeader>
				  <TableBody>
				  	{
				  		this.state.contacts.map((contact) => {
				  			return (
				  				<TableRow>
						      		<TableRowColumn>{contact.name}</TableRowColumn>
						      		<TableRowColumn>{contact.phone}</TableRowColumn>
						    	</TableRow>
				  			)
				  		})
				  	}
				  </TableBody>
				</Table>
			</div>
		);
	}
}

export default ContactList;