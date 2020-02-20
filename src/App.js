import React, { useState, useCallback } from 'react';
import './App.css';
import AddTodoItemBtn from './components/AddTodoItemBtn';
import TodoItem from './components/TodoItem';
import useLongPress from './utils/useLongPress';

function App() {
  const [todoItems, setTodoItems] = useState([]);

  const todoItemComparer = (a, b) => {
    if (a.done !== b.done) {
      if (a.done) {
        return 1;
      } else {
        return -1;
      }
    } else {
      if (a.itemContent === b.itemContent) {
        return 0;
      } else {
        return a.itemContent < b.itemContent ? -1 : 1;
      }
    }
  }

  const sortTodoItems = () => {
    setTodoItems(items => items.sort(todoItemComparer));
  }

  const handleAddBtn = () => {
    setTodoItems(items => [...items, {
      itemContent: '',
      filled: false,
      done: false,
      editing: true,
      handleDelete: () => { }
    }]);
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
        sortTodoItems();
        return items.filter(itm => itm.editing !== true);
      });
    } else {
      handleSubmit(value);
    }
  };

  const deleteHandler = useCallback((event) => {
    console.log(`no of todo items: ${todoItems.length}`);
    const currentItemIndex = todoItems.findIndex(itm => itm.itemContent === event.target.previousSibling.textContent && itm.done === false);
    if (currentItemIndex >= 0) {
      setTodoItems(function (items) {
        items.splice(currentItemIndex, 1);
        items.sort(todoItemComparer);
        return Array.from(items);
      });
    }
  }, [todoItems]);

  console.log(`real no of todo items: ${todoItems.length}`);

  const handleSubmit = (value) => {
    setTodoItems(function (items) {
      const setPos = items.findIndex(itm => itm.editing === true);
      const currentItem = items[setPos];
      currentItem.itemContent = value.trim() !== '' ? value.trim() : currentItem.itemContent;
      currentItem.editing = false;
      if (currentItem.itemContent === '') {
        items.splice(setPos, 1);
      }
      items.sort(todoItemComparer);
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
    } else if (event.key === "Escape") {
      // event.currentTarget.value = '';
      handleFocusLost(event);
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

  const handleLongPress = (eventTarget) => {
    console.log(eventTarget);
    const value = eventTarget.textContent;
    setTodoItems(items => {
      items.find(itm => itm.itemContent === value).done = true;
      items.sort(todoItemComparer);
      return Array.from(items);
    })
  };

  const longMousePress = useLongPress(handleLongPress, 500);

  return (
    <>
      <AddTodoItemBtn handleClick={handleAddBtn} />
      <ul>
        {todoItems.map((itm, index) =>
          <li key={index} className={itm.done ? 'done' : ''}>
            {<TodoItem itemContent={itm.itemContent} done={itm.done} editing={itm.editing} handleFocusLost={handleFocusLost}
              handleItemDelete={deleteHandler} handleKeyPress={handleKeyPress} handleDoubleClick={handleDoubleClick}
              {...longMousePress} />}
          </li>)}
      </ul>
    </>
  );
}

export default App;
