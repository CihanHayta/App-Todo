import "./App.css";
import { useEffect, useRef, useState } from "react";
import Card from "./component/Card";
import { ToastContainer, toast,Bounce } from 'react-toastify';
import { AddPlaySound, ClearAllPlaySound, DeletePlaySound, UpdatePlaySound } from "./Sound";

function App() {
 
  const [filter, SetFilter] = useState("all");
  const inputRef = useRef();




  //?LocalStogre ekleyecegiz


//!Theme local
const ThemeLocal=()=>{
const data= localStorage.getItem("theme")
return data ? data : ""
}
 const [theme, SetTheme] = useState(ThemeLocal);

useEffect(()=>{
  localStorage.setItem("theme",theme)
},[theme])

  const ToogleTheme=()=>{    
    SetTheme(theme => theme === "dark" ? "light" : "dark");
  }
//!TODO Local
  const getLocal = () => {
    const data = localStorage.getItem("todo");
    return data ? JSON.parse(data) : [];
  };
  const [todos, SetTodos] = useState(getLocal);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]); //todos her degistikce guncel halini set eder

  //? localdeki verileri kaldirmak icin kullancagiz

  const ClearAll = () => {
    let isSure = confirm("Tamemen silinecek tum todolar ");
    if (isSure === true) {
      localStorage.clear();
      SetTodos([]);
    }
    ClearAllPlaySound();
    toast.error("HEPSI SILINDI...")
  };

  //   //? toogleComplted degsimini izlemek icin kullanildi
  //   useEffect(() => {
  //   console.log("Todos güncellendi:", todos);
  // }, [todos]);

  //? first once inputtan veri alip prop yollayacagiz

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const inputText = inputRef.current.value.trim();
      if (!inputText) {
        toast.error("Boş todo eklenemez");
        return;
      }

      //?gelen anlik verie id completed ekliyoruz

      SetTodos((todos) => [
        ...todos,
        {
          id: crypto.randomUUID(),
          text: inputText,
          completed: false,
        },
      ]);
      AddPlaySound();
      toast.success("Basariyla eklendi")

      inputRef.current.value = "";
    }
  };

  //? silme islemi

  const handleDelete = (id) => {
    let isOkey = confirm("Silmek istediginize emin misiniz?");

    if (isOkey === true) {
      SetTodos((todo) => todo.filter((tod) => tod.id !== id));
       DeletePlaySound();
    toast.success("Basariyla Silindi..")
    } else {
      toast.warn(" todo Silinmedi");
    }
   
  };

  //? SetTodostaki verileri completed degerine gore filtreyip map icin hazirlaycagiz

  const filterCard = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  //? Todos icinde completed icinde ki veriyi toogle seklinde

  const toogleCompleted = (id) => {
    SetTodos((todos) =>
      todos.map((tod) =>
        tod.id === id ? { ...tod, completed: !tod.completed } : tod
      )
    );
    console.log("tetiklendi toogle");
  };

  //? cift tiklayinca guncellemek icin kullnacagiz

  const DoubleClickHandle = (editId, newText) => {
    SetTodos((todos) =>
      todos.map((tod) => (tod.id === editId ? { ...tod, text: newText } : tod))
    );

    UpdatePlaySound();
    toast.success("Basariyla Guncellendi");
  };

  return (

    <> 
 <ToastContainer
        position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
      />
    
    <div className={`container ${theme === "dark" ? "dark":"light"}`}>
      <p className="title">todos</p>

      <img className="tema-img"
      onClick={ToogleTheme}
      src={theme ? "assets/dark-tema.png":"assets/light-tema.png" } alt="" />

      <div className="input-wrapper">
        <img className="img-arrow" src="assets/arrow-down-01.png" alt="" />
        <input
          className="input"
          type="text"
          ref={inputRef}
          onKeyDown={handleEnter}
          placeholder="What needs to be done?"
        />
      </div>

      {/* card Component */}

      {/* {todos.map((todo) => (
      <Card DoubleClickHandle={DoubleClickHandle} handleDelete={handleDelete} todos={todo} ToggleComp={ToggleComp} key={todo.id} />
      ))} */}

      {filterCard.map((todos) => {
        return (
          <Card
            todos={todos}
            key={todos.id}
            handleDelete={handleDelete}
            toogleCompleted={toogleCompleted}
            DoubleClickHandle={DoubleClickHandle}
          />
        );
      })}

      {/* footer  */}
      <div className="input-down">
        <p> {todos.length} item left</p>
        <div className="input-down-inner">
          <a
            style={{
              color: theme ==="dark" ? "white" : "black",
            }}
            onClick={()=>SetFilter("all")}
            href="#"
          >
            All
          </a>
          <a
            style={{
              color: theme === "dark" ? "white" : "black",
            }}
            onClick={() => SetFilter("active")}
            href="#"
          >
            Active
          </a>
          <a
            style={{
              color: theme === "dark" ? "white" : "black",
            }}
            onClick={() => SetFilter("completed")}
            href="#"
          >
            Completed
          </a>
        </div>
        <a onClick={() => ClearAll()} href="#">
          Clear completed
        </a>
      </div>
    </div>
    </>
  );
}

export default App;
