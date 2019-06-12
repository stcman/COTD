import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes:{},
        order: {}
    };


    // persisting fishes in DB
componentDidMount(){ 
    const {params} = this.props.match;
    //first reinstate our localstorage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
        this.setState({order: JSON.parse(localStorageRef)});
    }

    this.ref = base.syncState(`${params.storeId}/fishes`, {
        context: this,
        state: 'fishes' //state what we wan't to sync
    });// different from input ref. This one referring to piece in DB

    
}

componentDidUpdate(){
    const {params} = this.props.match
    localStorage.setItem(params.storeId, JSON.stringify(this.state.order));
}

componentWillUnmount () {
    base.removeBinding(this.ref);
}

    addFish = fish => {
        // 1. Take a copy of the existing state
        const fishes = {...this.state.fishes};
        // 2. Add our new fish to that fishes vaiable
        fishes[`fish${Date.now()}`] = fish; // creating object key value pair (NOT ARRAY)
        // 3. Set the new fishes object to state
        this.setState({fishes})
    }

    updateFish = (key, updatedFish) => {
        //1. Take a copy of fishe's current state
        const fishes = {...this.state.fishes};
        //2. Update that state
        fishes[key] = updatedFish;
        //3. Set that to state
        this.setState({fishes});
    }

    deleteFish = (key) => {
        //1. Take copy of state
        const fishes = {...this.state.fishes};
        //2. Remove the fish
        fishes[key] = null;

        //3. Update the state

        this.setState({fishes});
    }

    loadSampleFishes = () => {
        this.setState({fishes: sampleFishes});
    }

    addToOrder = (key) => {
        //1. Take a copy of state
        const order = {...this.state.order}
        //2. Either add to the order or update number in our order
        order[key] = order[key] + 1 || 1;
        //3. Call setstate to update our state object
        this.setState({order});
    }

    removeFromOrder = (key) => {
        //1. Get copy of order from state
        const order = {...this.state.order};

        //2. Remove order
        if(order[key] > 1){
            order[key] = order[key] - 1;
        }else {
            delete order[key];
        }

        //3. Update State
        this.setState({order});
    }
    
    render(){
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline= "Fresh Seafood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} addToOrder={this.addToOrder} index={key} details={this.state.fishes[key]}/>)}
                    </ul>
                </div>
                    <Order fishes={this.state.fishes} orders={this.state.order} removeFromOrder={this.removeFromOrder} />
                    <Inventory addFish={this.addFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} updateFish={this.updateFish} deleteFish={this.deleteFish} storeId={this.props.match.params.storeId}/>
            </div>
        )
    }
}

export default App;