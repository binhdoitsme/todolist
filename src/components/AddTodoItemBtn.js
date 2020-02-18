import React, { Component } from 'react';

class AddTodoItemBtn extends Component {
    constructor(props) {
        super(props);
        this.handleClick = props.handleClick;
    }

    render() {
        return <button onClick={this.handleClick}>+ Add Todo Item</button>
    }
}

export default AddTodoItemBtn;