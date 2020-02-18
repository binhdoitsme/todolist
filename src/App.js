import React, { useState } from 'react';
import './App.css';
import AddTodoItemBtn from './components/AddTodoItemBtn';
import TodoItem from './components/TodoItem';
import useLongPress from './utils/useLongPress';

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const handleAddBtn = () => {
    setTodoItems(items => [...items, { itemContent: '', filled: false, done: false, editing: true }]);
  };

  // only one item can be edited at a time
  /**
   * 
   * @param {Event} event 
   */
  const handleFocusLost = (event) => {
    const value = event.target.value;
    if (value.length === 0) {
      setTodoItems(items => {
        return items.filter(itm => itm.editing !== true);
      });
    } else {
      handleSubmit(value);
    }
  };

  const handleDeleteBtn = (event) => {
    const currentItemIndex = todoItems.findIndex(itm => itm.itemContent === event.target.previousSibling.textContent);
    setTodoItems(function (items) {
      items.splice(currentItemIndex, 1);
      return Array.from(items);
    });
  };

  const handleSubmit = (value) => {
    setTodoItems(function (items) {
      const setPos = items.findIndex(itm => itm.editing === true);
      const currentItem = items[setPos];
      currentItem.itemContent = value;
      currentItem.editing = false;
      return Array.from(items);
    });
  };

  /**
   * 
   * @param {KeyboardEvent} event 
   */
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event.target.value);
    }
  };

  /**
   * 
   * @param {Event} event 
   */
  const handleDoubleClick = (event) => {
    const value = event.target.textContent;
    setTodoItems(items => {
      items.find(itm => itm.itemContent === value).editing = true;
      return Array.from(items);
    })
  };
  
  return (
    <>
      <AddTodoItemBtn handleClick={handleAddBtn} />
      <ul>
        {todoItems.map((itm, index) =>
          <li key={index}>
            {<TodoItem itemContent={itm.itemContent} done={itm.done} editing={itm.editing} handleFocusLost={handleFocusLost}
              handleItemDelete={handleDeleteBtn} handleKeyPress={handleKeyPress} handleDoubleClick={handleDoubleClick} />}
          </li>)}
      </ul>
    </>
  );
}

export default App;
