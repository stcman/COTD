import React from 'react';

class EditFishForm extends React.Component {

    handleChange = event => {
        //update that fish
        //1. Take copy fo the current fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value //in [] -> referring to name (name we set below) of field that was changed. So changes respective value in fish object
        };

        this.props.updateFish(this.props.index, updatedFish)
    }

    render(){
        return(
            <div className="fish-edit">
                <input name="name" ref={this.nameRef} type="text" onChange={this.handleChange} value={this.props.fish.name}/>
                <input name="price" ref={this.priceRef} type="text" onChange={this.handleChange} value={this.props.fish.price}/>
                <select name="status" ref={this.statusRef} onChange={this.handleChange} value={this.props.fish.status} >
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea name="desc" ref={this.descRef} onChange={this.handleChange} value={this.props.fish.desc}/>
                <input name="image" ref={this.imageRef} type="text" onChange={this.handleChange} value={this.props.fish.image}/>
                <button onClick={() => this.props.deleteFish(this.props.index)}>Remove Fish</button>
            </div>
        )
    }
}

export default EditFishForm;