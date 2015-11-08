import React from 'react';
import {TextField} from 'material-ui';
import DropdownList from './DropdownList';

const search = {
	textAlign : 'left'
}

class Autocomplete extends React.Component{
	constructor () {
		super ();
		this.state = {value : ''};
		this.debounce = this.debounce.bind(this);
	}
	componentWillMount () {
		this.changeValue = this.debounce(this.changeValue.bind(this),500);
	}
	render () {
		return (
			<div style={search}>
				<TextField ref="searchBar" floatingLabelText="Search name" onChange={this.changeValue}/>
				{this.state.value && <DropdownList searchValue={this.state.value}></DropdownList>}
			</div>
		)
	}

	debounce (func, wait, immediate) {
	    // 'private' variable for instance
	    // The returned function will be able to reference this due to closure.
	    // Each call to the returned function will share this common timer.
	    var timeout;           

	    // Calling debounce returns a new anonymous function
	    return function() {
	        // reference the context and args for the setTimeout function
	        var context = this, 
	            args = arguments;

	        // Should the function be called now? If immediate is true
	        //   and not already in a timeout then the answer is: Yes
	        var callNow = immediate && !timeout;

	        // This is the basic debounce behaviour where you can call this 
	        //   function several times, but it will only execute once 
	        //   [before or after imposing a delay]. 
	        //   Each time the returned function is called, the timer starts over.
	        clearTimeout(timeout);   

	        // Set the new timeout
	        timeout = setTimeout(function() {

	             // Inside the timeout function, clear the timeout variable
	             // which will let the next execution run when in 'immediate' mode
	             timeout = null;

	             // Check if the function already ran with the immediate flag
	             if (!immediate) {
	               // Call the original function with apply
	               // apply lets you define the 'this' object as well as the arguments 
	               //    (both captured before setTimeout)
	               func.apply(context, args);
	             }
	        }, wait);

	        // Immediate mode and no wait timer? Execute the function..
	        if (callNow) func.apply(context, args);  
	    }
	}

	changeValue (e) {
		this.setState({value: this.refs.searchBar.getValue()});
	}
}

export default Autocomplete;