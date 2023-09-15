import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
uuidv4();

const TodoList = () => {
  const [data, setData] = useState("");
  const [items, setItems] = useState([]);
  const [toggleItem, setToggleItem] = useState(true);
  const [isEditing, setIsEditing] = useState(null);

  const additem = () => {
    if (!data) {
        Swal.fire(
            'Please Fill The Task?',
            'The Task is Empty ?',
            'question'
          )
          

    } else if (data && !toggleItem) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditing) {
            return { ...elem, name: data };
          }
          return elem;
        })
      );
      setToggleItem(true);
      setData('');
      setIsEditing(null);

    } else {
      setItems([...items, { id: uuidv4(), name: data }]);
      setData("");
    }
  };
  const deleteItem = (index) => {
    const updatedItems = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updatedItems);
  };

  const editItem = (id) => {
    let newEdit = items.find((elem) => {
      return elem.id === id;
    });
    console.log(newEdit);
    setToggleItem(false);
    setData(newEdit.name);
    setIsEditing(id);
  };
  return (
    <>
      <div className="TodoWrapper">
        <div className="TodoForm">
          <h1 className="h1">Write Your Task Here !</h1>
          <input
            className="todo-input"
            type="text"
            placeholder="Task for today"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
          <button className="todo-btn" type="submit" onClick={additem}>
            {toggleItem ? "Add Task " : "Update Task"}
          </button>
          {items.map((elem) => {
            return (
              <>
                <div className="Todo" key={elem.id}>
                  <p>{elem.name}</p>
                  <div>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      onClick={() => editItem(elem.id)}
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteItem(elem.id)}
                    />
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TodoList;
