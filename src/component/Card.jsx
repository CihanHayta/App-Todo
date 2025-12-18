import { useState } from "react";
import "./Card-styles.css";

export default function Card({ todo,onToggle, handleDelete }) {
  // const [isClick, SetisClick] = useState(false);
  // const [completed, SetCompleted] = useState([]);
  // const [active, SetActive] = useState([]);

  //! filtered active all vb click olamsina gore todoyu getir

  // const handleActive = (item) => {
  //   SetActive((prev) => [...prev, item]);
  // };
  // console.log(active, "active state");

  // const handleComplete = (item) => {
  //   SetCompleted((prev) => [...prev, item]);
  // };

  // console.log(completed, "compltered state");

  const handleCLick = () => {
    SetisClick((a) => !a);
  };

  console.log(todo);
  

  return (
    <div className="Card-Container">
      {
      //? benim yaptigim yol
      /* {isClick ? (
        <img
          onClick={() => {
            handleCLick();
            handleActive(value);
          }}
          className="circile-icons"
          src="/assets/empty.png"
          alt=""
        />
      ) : (
        <img
          onClick={() => {
            handleCLick();
            handleComplete(value);
          }}
          className="circile-icons"
          src="/assets/circle.png"
          alt=""
        />
      )} */
      //? chat in yaptigi yol
      <img
        onClick={() => {
          onToggle(todo.id)
        }}
        className="circile-icons"
        src={ 
          todo.completed ? "/assets/empty.png" :"/assets/circle.png"
        }
        alt=""
         
      />
      
      
      }

      {/* sorun {value } vermek direk obejyi renden edemezsin o yuzden {value.item} vermelisin */}

      <h4 style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
        
        {todo.text}
      </h4>

      {/*  handle(value.id) */}
      <img
        onClick={() => handleDelete(todo.id)}
        className="delete-icon"
        src="/assets/no.png"
        alt=""
      />
    </div>
  );
}
