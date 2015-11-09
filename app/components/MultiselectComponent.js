import React from 'react';
import {TextField} from 'material-ui';
import DropdownList from './DropdownList';
import EditInput from './EditInput';

const rightSpace = {
	'float'  : 'right'
}

const multiBorder = {
	width: 200,
    borderTop: '1px solid'
}

const closeSpan = {
	fontWeight: 'bold',
	color: 'green',
	fontSize: '80%',
	cursor: 'pointer'
}

let spancounter = 0;

class MultiselectComponent extends React.Component {
	constructor () {
		super ();
		this.state = {
			currentInput : 'multi0',
			children : [{id: 'multi0', text:'', type:'input'}],
		}
		this._onKeyUp = this._onKeyUp.bind(this);
		this._applyStyleOnSelectedWord = this._applyStyleOnSelectedWord;
		this._onRemove = this._onRemove.bind(this);
		this._onEnterPress = this._onEnterPress.bind(this);
		this._editSpan = this._editSpan.bind(this);
		this._inputClick = this._inputClick.bind(this);
		this._setNewState = this._setNewState.bind(this);
	}

	componentDidMount (){
          this.refs[this.state.currentInput].getDOMNode().focus(); 
    }

	componentDidUpdate (){
          this.refs[this.state.currentInput].getDOMNode().focus(); 
    }

	_onKeyUp (event, react, editMode) {
		if(event.key === "Enter" || event.keyIdentifier === "Enter"){
			this._onEnterPress(event, react, editMode);
		}
	}

	_onEnterPress (event, react,  editMode) {
		var id = event.currentTarget.id;
		var value = event.currentTarget.value;
		event.currentTarget.value = '';
		var span = {
			id : 'span' + spancounter++,
			text : value,
			type: 'span'
		}	

		this._setNewState(span, id);
	}

	_onRemove (event) {
		var id = event.currentTarget.id;
		var children = this.state.children.filter(function(child){
			return child.id !== id;
		});
		this.setState(
			{
				children : children
			}
		)
	}

	_editSpan (event) {
		var children = this.state.children;
		var spanId = event.currentTarget.id;
		var indexOfSpan;
		children.forEach(function(child, index){
			if(child.id === spanId){
				indexOfSpan =  index;
			}
		});
		var removed = children.splice(indexOfSpan,1,{id: 'edit0', text: '', type:'input'});
		this.setState({
			children: children,
			editMode : true,
			currentInput : 'edit0'
		})
	}

	_inputClick () {
		var defaultVal = this.refs['edit0'];
		var value = this.refs['edit0'] && this.refs['edit0'].getDOMNode().value;
		if(value){
			var span = {
				id : 'span' + spancounter++,
				text : value,
				type: 'span'
			}
			this._setNewState(span, "edit0");

		}else if(defaultVal){
			this._setNewState("", "edit0");
		}
	}

	_setNewState (span, id, onEnter) {
		var children = this.state.children;
		var childIndex;

		children.forEach(function(child,index){
			if(child.id === id){
				childIndex = index;
			}
		})

		var removedArr = children.splice(childIndex,0,span);

		children = this.state.children.filter(function(child){
			return child && child.id !== 'edit0';
		});
		
		this.setState({
			children : children,
			currentInput: 'multi0'
		})
	} 

	render () {
		return (
			<div style={rightSpace}>
				{
					this.state.children.map((elm) => {
						if(elm.type === 'input'){
							return <input id={elm.id} className="inputStyle" onKeyUp={this._onKeyUp} key={elm.id} ref={elm.id} onClick={this._inputClick}/>
						}else{
							return <span id={elm.id} className="selectedText" key={elm.id} 
									ref={elm.id} onDoubleClick={this._editSpan}>{elm.text} 
									<span id={elm.id} style={closeSpan} onClick={this._onRemove}>x</span>
									</span>
						}
					})
				}
				<div style={multiBorder}></div>
			</div>
		);
	}
}

export default MultiselectComponent;