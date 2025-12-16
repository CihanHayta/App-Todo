import "./App.css";
import { useRef, useState } from "react";
import Card from "./component/Card";

function App() {
  const inputRef = useRef();
  const [value, setValue] = useState([]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const text = inputRef.current.value.trim();

      if(!text) return;
      // map dizi doner o yuzden diziye cevridir sperad ile
      setValue((pre)=>[
        ...pre,
        {
          id:crypto.randomUUID(),
          text:text
        }
      ]);
      //input u temizler
      inputRef.current.value="";
    }
  };



  

  const handleDelete=(id)=>{
      setValue(prev=>prev.filter(item=> item.id !== id));
      console.log("handle delete tekiktlendi",id);
      
  }




  return (
    <div className="container">
      <p className="title">todos</p>
      <div className="input-wrapper">
        {value && (
          <img
            className="img-arrow"
            src="src/assets/arrow-down-01.png"
            alt=""
          />
        )}
        <input
          ref={inputRef}
          type="text"
          onKeyDown={handleEnter}
          className="input"
          placeholder="What needs to be done?"
        />
      </div>

      {/* eklenen valuler */}

      {value?.map((val,index) => (
       <Card
       // obje olarak yolla
        value={val}
        key={val.id}
        // prop adi neyse child o adi yakala 
        handleDelete={handleDelete}
          />
       
      ))}
      

      {/* footer  */}

      {value && (
        <div className="input-down">
          <p> {value.length} item left</p>
          <div className="input-down-inner">
            <a href="#">All</a>
            <a href="#">Active</a>
            <a href="#">Completed</a>
          </div>
          <a href="#">Clear completed</a>
        </div>
      )}
    </div>
  );
}

export default App;
