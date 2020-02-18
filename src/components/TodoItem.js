import React, { Component } from "react";

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleFocusLost = props.handleFocusLost.bind(this);
        this.handleItemDelete = props.handleItemDelete.bind(this);
        this.handleKeyPress = props.handleKeyPress.bind(this);
        this.handleDoubleClick = props.handleDoubleClick.bind(this);
    }

    render() {
        if (this.props.editing) {
            return <input type='text' defaultValue={this.props.itemContent} autoFocus 
                        onBlur={this.handleFocusLost} onKeyUp={this.handleKeyPress} />;
        }
        else if (!this.props.editing & !this.props.done) {
            return (
                <>
                    <span onDoubleClick={this.handleDoubleClick}>{this.props.itemContent}</span>
                    <button onClick={this.handleItemDelete}>X</button>
                </>
            );
        } else {
            return <span className="done">{this.props.itemContent}</span>
        }
    }
}

export default TodoItem;