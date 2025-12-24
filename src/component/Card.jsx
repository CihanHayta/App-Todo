import { useRef, useState } from "react";
import "./Card-styles.css";

function Card({ todos, handleDelete, toogleCompleted, DoubleClickHandle }) {
  const [isEdit, SetIsEdit] = useState(false);
  const cardRef = useRef();

const handleUpdate=(e)=>{

  if(e.key === "Enter"){
    let updateText=cardRef.current.value.trim();
    if(!updateText){
      alert("Icerik giriniz lutfen")
    }
    DoubleClickHandle(todos.id,updateText)
    SetIsEdit(false)
  }

  }


  return (
    <div
    onDoubleClick={()=>SetIsEdit(true)}
    className="Card-Container">
      <img
        className="circile-icons"
        src={ !todos.completed ? "assets/circle.png" : "assets/empty.png"}
        alt=""
        onClick={() => toogleCompleted(todos.id)}
      />

      {/* //? input gelecek edit olunca */}

      {isEdit ? (
        <input 
        ref={cardRef}
        onKeyDown={handleUpdate}
        type="text" className="Card-input" />

      ) : (
        <h4
          style={{
            textDecoration: !todos.completed ?   "none":"line-through",
          }}
        >
          {todos.text}
        </h4>
      )}

      <img
        onClick={() => handleDelete(todos.id)}
        className="delete-icon"
        src="/assets/no.png"
        alt=""
      />
    </div>
  );
}

export default Card;
