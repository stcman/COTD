import React from 'react';
import {getFunName} from '../helpers';


class StorePicker extends React.Component {

    myInput = React.createRef();
    
    goToStore = event =>  { //important that we use arrow function as it binds 'this' to StorePicker component
        // 1. Stop the form from submitting
        event.preventDefault();
        // 2. get the text from that input
        const storeName = this.myInput.current.value; 
        // 3. Change the page to /store/whatever-they-entered
        this.props.history.push(`/store/${storeName}`) //history is part of one of the default props on this component
    }

    render() {
        return (
        <form className= "store-selector" onSubmit={this.goToStore}>
            <h2>Please Enter A Store</h2>
            <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
            <button type="submit">Visit Store -></button>
        </form>
        )
    }
}

export default StorePicker;