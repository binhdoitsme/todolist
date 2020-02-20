import React, { Component } from "react";
import './TodoItem.css';

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.handleFocusLost = props.handleFocusLost.bind(this);
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
                    <span className="todo-item" onDoubleClick={this.handleDoubleClick} onMouseDown={this.props.onMouseDown}
                        onMouseUp={this.props.onMouseUp} onMouseLeave={this.props.onMouseLeave}
                        onTouchStart={this.props.onTouchStart} onTouchEnd={this.props.onTouchEnd}>
                        {this.props.itemContent}</span>
                    <button className="delete-btn" onClick={this.props.handleItemDelete}>X</button>
                </>
            );
        } else {
            return (
                <>
                    <span className="todo-item done">{this.props.itemContent}</span>
                    <button disabled className={"delete-btn hidden"}>X</button>
                </>
            );
        }
    }
}

export default TodoItem;