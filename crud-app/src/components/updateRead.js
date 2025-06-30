import { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, get, remove } from "firebase/database";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function UpdateRead() {
  //  ek array banai hai ess main data laa kar store karing gy
  let [fruitArray, setFruitArray] = useState([]);

  const [loading, setLoading] = useState(false);

  const getFruitData = async () => {
    setLoading(true);
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits");
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const myData = snapshot.val();
      const tempArray = Object.keys(myData).map((myFireId) => {
        return {
          ...myData[myFireId],
          fruitId: myFireId,
        };
      });

      setFruitArray(tempArray);
    } else {
      alert("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    getFruitData();
  }, []);

  const navigation = useNavigate();

  const deleteFruit = async (fruitIdParam) => {
    const db = getDatabase(app);
    const dbRef = ref(db, "nature/fruits/" + fruitIdParam);
    await remove(dbRef);
    window.location.reload();
  };

  return (
    <div>
      <h1>Hello Tahir Read Data!</h1>
      <button style={{ cursor: "pointer" }} onClick={getFruitData}>
        Display Data
      </button>
      <br />
      <br />
      <button style={{ cursor: "pointer" }} onClick={() => navigation("/read")}>
        Read Data
      </button>
      <br /> <br />
      <button
        style={{ cursor: "pointer" }}
        onClick={() => navigation("/write")}
      >
        Add More Data
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
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div>
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
                <span
                  style={{
                    background: "aqua",
                    borderRadius: "4px",
                    marginLeft: "10px",
                    padding: "4px 10px",
                    listStyle: "none",
                    color: "black",
                  }}
                >
                  {item.fruitId}
                </span>
              </div>

              <div>
                <button
                  onClick={() => navigation(`/update-write/${item.fruitId}`)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  Update
                </button>
                <button
                  onClick={() => deleteFruit(item.fruitId)}
                  style={{
                    cursor: "pointer",
                    borderRadius: "10px",
                    padding: "7px",
                  }}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
