import React from 'react';
import AppAction from '../actions/AppAction';
import ContactStore from '../stores/ContactStore';

const borderColor = "blue";

const listStyle = {
	parent: {
		border : '1px solid blue',
		listStyleType: 'none',
		width: '17%'
	},

	child : {
		borderBottom : '1px solid lightgray',
		padding : 5
	}

}

class DropdownList extends React.Component {
	constructor () {
		super();
		this.state = { dropdownContacts: [] };
		this._onChange = this._onChange.bind(this);
	}

	componentDidMount () {
		ContactStore.addChangeListener(this._onChange);
		AppAction.getRelatedContacts(this.props.searchValue);
	}

	componentWillReceiveProps (props) {
		AppAction.getRelatedContacts(props.searchValue);
	}

	componentWillUnmount () {
		ContactStore.removeChangeListener(this._onChange);	
	}

	_onChange () {
		this.setState({ dropdownContacts: ContactStore.getRelatedContacts()});
	}

	render () {
		return (
			<div className="dropdown-list">
				<ul style={listStyle.parent}>
					{
						this.state.dropdownContacts.map(function(contact){
							return (
								<li style={listStyle.child}>{contact.name}</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}

export default DropdownList;