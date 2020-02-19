import React, { Component } from 'react';
import './AddTodoItemBtn.css'

class AddTodoItemBtn extends Component {
    constructor(props) {
        super(props);
        this.handleClick = props.handleClick;
    }

    render() {
        return <button className="add-btn" onClick={this.handleClick}>+ Add Todo Item</button>
    }
}

export default AddTodoItemBtn;