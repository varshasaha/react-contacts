import React from 'react';
import {TextField} from 'material-ui';
import DropdownList from './DropdownList';

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

let multicounter = 0, spancounter = 0;

class MultiselectComponent extends React.Component {
	constructor () {
		super ();
		this.state = {
			inputs : [{id: 'multi' + multicounter++, text:''}],
			spans : [],
			currentInput : 'multi0',
			value : ''
		}
		this._onEnter = this._onEnter.bind(this);
		this._applyStyleOnSelectedWord = this._applyStyleOnSelectedWord;
		this._onRemove = this._onRemove.bind(this);
		//this._debounce = this._debounce.bind(this);
		//this.changeValue = this.debounce(this.changeValue.bind(this),500);
	}

	componentDidMount (){
          this.refs[this.state.currentInput].getDOMNode().focus(); 
    }

	componentDidUpdate (){
          this.refs[this.state.currentInput].getDOMNode().focus(); 
    }

	_onEnter (event) {
		if(event.key === "Enter"){
			console.log(this.refs);
			var id = event.currentTarget.id;
			var value = event.currentTarget.value;
			var span = {
				id : 'span' + spancounter++,
				text : value
			}
			var inputs = this.state.inputs.filter(function(input){
				return input.id !== id;
			});
			this.setState(
				{
					currentInput : 'multi' + multicounter,
					inputs : inputs.concat([{id: 'multi' + multicounter++, text: ''}]),
					spans : this.state.spans.concat([span])
				}
			)
		}
	}

	_onRemove (event) {
		var id = event.currentTarget.id;
		var spans = this.state.spans.filter(function(span){
			return span.id !== id;
		});
		this.setState(
			{
				spans : spans
			}
		)
	}

	_debounce (func, wait, immediate) {
	    var timeout;           
	    return function() {
	        var context = this, 
	            args = arguments;
	        var callNow = immediate && !timeout;
	        clearTimeout(timeout);   

	        timeout = setTimeout(function() {
	             timeout = null;

	             if (!immediate) {
	               func.apply(context, args);
	             }
	        }, wait);

	        if (callNow) func.apply(context, args);  
	    }
	}

	render () {
		return (
			<div style={rightSpace}>
				{
					this.state.spans.map((elm) => {
						return <span className="selectedText" key={elm.id} ref={elm.id}>{elm.text} <span id={elm.id} style={closeSpan} onClick={this._onRemove}>x</span></span>
					})
				}
				{
					this.state.inputs.map((elm) => {
						return <input onChange id={elm.id} className="inputStyle" onKeyPress={this._onEnter} key={elm.id} ref={elm.id} />
					})
				}
				<div style={multiBorder}></div>
			</div>
		);
	}
}

export default MultiselectComponent;