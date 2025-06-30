import { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get } from "firebase/database";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Read() {
  //  ek vairable array banai hai ess main data laa kar store karing gy
  let [fruitArray, setFruitArray] = useState([]);

  const [loading, setLoading] = useState(false);

  const getFruitData = async () => {
    setLoading(true);
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      setFruitArray(Object.values(snapshot.val()));
    } else {
      alert("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    getFruitData();
  }, []);

  const navigation = useNavigate();

  return (
    <div>
      <h1>Hello Tahir Read Data!</h1>
      <button style={{ cursor: "pointer" }} onClick={getFruitData}>
        Display Data
      </button>
      <br /> <br />
      <button
        style={{ cursor: "pointer" }}
        onClick={() => navigation("/write")}
      >
        Add More Data
      </button>
      <br/>
      <br/>
      <button
        style={{ cursor: "pointer" }}
        onClick={() => navigation("/update-read")}
      >
        update Prev Data
      </button>
      {loading ? (
        <h1>Loading.........</h1>
      ) : (
        <ul>
          {fruitArray.map((item, idx) => (
            <li
              key={idx}
              style={{
                background: "green",
                color: "white",
                padding: "8px",
                borderRadius: "3px",
                margin: " 10px 0",
              }}
            >
              {item.fruitName}:
              <span
                style={{
                  background: "red",
                  borderRadius: "4px",
                  marginLeft: "10px",
                  padding: "4px 10px",
                  listStyle: "none",
                }}
              >
                {item.fruitDesc}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
