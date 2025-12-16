import { useState } from "react";
import "./Card-styles.css";

export default function Card({ value, handleDelete }) {
  const [isClick, SetisClick] = useState(false);
  const [completed, SetCompleted] = useState([]);
  const [active, SetActive] = useState([]);

  //! filtered active all vb click olamsina gore todoyu getir

  const handleActive = (item) => {
    SetActive((prev) => [...prev, item]);
  };
  console.log(active, "active state");

  const handleComplete = (item) => {
    SetCompleted((prev) => [...prev, item]);
  };

  console.log(completed, "compltered state");

  const handleCLick = () => {
    SetisClick((a) => !a);
  };

  return (
    <div className="Card-Container">
      {isClick ? (
        <img
          onClick={() => {
            handleCLick();
            handleActive(value);
          }}
          className="circile-icons"
          src="/src/assets/empty.png"
          alt=""
        />
      ) : (
        <img
          onClick={() => {
            handleCLick();
            handleComplete(value);
          }}
          className="circile-icons"
          src="/src/assets/circle.png"
          alt=""
        />
      )}

      {/* sorun {value } vermek direk obejyi renden edemezsin o yuzden {value.item} vermelisin */}

      <h4 style={{ textDecoration: isClick ? "line-through" : "none" }}>
        
        {value.text}
      </h4>

      {/*  handle(value.id) */}
      <img
        onClick={() => handleDelete(value.id)}
        className="delete-icon"
        src="/src/assets/no.png"
        alt=""
      />
    </div>
  );
}
