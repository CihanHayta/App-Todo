import "./App.css";
import { useEffect, useRef, useState } from "react";
import Card from "./component/Card";

function App() {
  const inputRef = useRef();

  //LocalStogre siralama onemli yokse veri gelmez ust satirda kaydet orta satirda cagir son satirda 
  //useeffect ile value izle ama statin altinda yap ki gelen veri once state sonra useffect ulassin

  const LocalSaveTodo = (value) => {
    localStorage.setItem("value", JSON.stringify(value));
  };

  const getLocalTodo = () => {
    const data = localStorage.getItem("value");
    return data ? JSON.parse(data) : [];
  };

    const [value, setValue] = useState(() => getLocalTodo());

  useEffect(() => {
    LocalSaveTodo(value);
  }, [value]);


  //? default olarak active cizecek map
  const [filter, setFilter] = useState("all");

  //!Theme local cagir
  const getTheme = () => {
    return localStorage.getItem("theme" || "dark");
  };
  const [theme, setTheme] = useState(getTheme);
  //!Theme local kaydet theme degisir degismez []
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  //! local degistike anlik calisir

  const toogleTema = () => {
    setTheme((tema) => (tema === "dark" ? "light" : "dark"));
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      const text = inputRef.current.value.trim();

      if (!text) return;
      // map dizi doner o yuzden diziye cevridir sperad ile
      setValue((pre) => [
        ...pre,
        {
          id: crypto.randomUUID(),
          text: text,
          completed: false,
        },
      ]);
      //input u temizler
      inputRef.current.value = "";
    }
  };

  //!Confirm ekle delete icon // clear completed // thema ekle // localstroge(thema,todos)

  ///? Prop yollanacak fonksiyonlar

  const Clearcompleted = () => {
    setValue([]);
  };

  const handleDelete = (id) => {
    let dogruMu = confirm("Silmek istediginiz emin misiniz?");

    if (dogruMu !== false) {
      setValue((prev) => prev.filter((item) => item.id !== id));
    } else {
      return;
    }
  };

  //!todonun icinde statusu completed alarak guncelleyecek

  const toogleCompleted = (id) => {
    setValue((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const visibleTodo = value.filter((todo) => {
    if (filter === "") return;
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    console.log(todo, "visibe");

    return true;
  });

  //?

  return (
    <div className={`container ${theme === "dark" ? "dark" : "light"}`}>
      <p className="title">todos</p>

      {/* <img
        onClick={() => {
          onToggle(todo.id)
        }}
        className="circile-icons"
        src={ 
          todo.completed ? "/assets/empty.png" :"/assets/circle.png"
        }
        alt=""
         
      /> */}

      <img
        className="tema-img"
        onClick={toogleTema}
        src={
          theme === "dark" ? "/assets/dark-tema.png" : "/assets/light-tema.png"
        }
        alt=""
      />

      <div className="input-wrapper">
        {value && (
          <img className="img-arrow" src="assets/arrow-down-01.png" alt="" />
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
      {/* //? benim yaptigim yol */}

      {/* {value?.map((val,index) => (
       <Card
       // obje olarak yolla
        value={val}
        key={val.id}
        // prop adi neyse child o adi yakala 
        handleDelete={handleDelete}
          />
       
      ))} */}

      {/* //? chatin yaptigi yol */}

      {visibleTodo.map((todo) => (
        <Card
          key={todo.id}
          todo={todo}
          onToggle={toogleCompleted}
          handleDelete={handleDelete}
        />
      ))}

      {/* footer  */}

      {value && (
        <div className="input-down">
          <p> {value.length} item left</p>
          <div className="input-down-inner">
            <a
              href="#"
              style={{ color: theme === "dark" ? "white" : "black" }}
              onClick={() => setFilter("all")}
            >
              All
            </a>
            <a
              href="#"
              style={{ color: theme === "dark" ? "white" : "black" }}
              onClick={() => setFilter("active")}
            >
              Active
            </a>
            <a
              href="#"
              style={{ color: theme === "dark" ? "white" : "black" }}
              onClick={() => setFilter("completed")}
            >
              Completed
            </a>
          </div>
          <a href="#" onClick={Clearcompleted}>
            Clear completed
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
