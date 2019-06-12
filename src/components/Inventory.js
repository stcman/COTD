import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, {firebaseApp} from '../base';

class Inventory extends React.Component {

    state = {
        uid: null,
        owner: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.authHandler({user});
            }
        })
    }
    
    authHandler = async (authData) => {
        //1. Lookup current store in firebase database
        const store = await base.fetch(this.props.storeId, {context: this});
        console.log(store.owner);
        //2. claim if no owner
        if(!store.owner){
            await base.post(`${this.props.storeId}/owener`,{
                data:authData.user.uid
            });
        }
        //3. Set the state of the inventoy component to reflect current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })

    }

    authenticate = (provider) => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
        .auth()
        .signInWithPopup(authProvider)
        .then(this.authHandler);
    }

    logout = async () => {
        console.log('Logging out!');
        await firebase.auth().signOut();
        this.setState({uid: null});
    }

    render(){

        const logout = <button onClick={this.logout}>Log Out!</button>;
        //1. Check if they're logged in
        if(!this.state.uid){
            return <Login authenticate={this.authenticate} />
        }

        //2. Check if they're not owner of store

        if(this.state.uid !== this.state.owner){
            return (
            <div>
                <p>Sorry you are not the owner!</p>
                {logout}
            </div>
            )
        }

        //3. They must be owner, just render inventory


        return (
            <div className="inventory">
                <h2>Inventory</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => <EditFishForm key={key} fish={this.props.fishes[key]} updateFish={this.props.updateFish} deleteFish={this.props.deleteFish} index={key} />)}
                <AddFishForm addFish={this.props.addFish} loadSampleFishes={this.props.loadSampleFishes}/>
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;