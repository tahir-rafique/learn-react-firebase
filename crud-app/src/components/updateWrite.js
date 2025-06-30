import { useState, useEffect } from "react";
import app from "../firebaseConfig";
import { getDatabase, ref, set, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
/* if you use fireStore of firebase the above sepcial method will change, it only work with firebase database not fire store*/
export default function Updatewrite() {
  const [inputValue1, setInputValue1] = useState(" ");
  const [inputValue2, setInputValue2] = useState(" ");
  console.log(inputValue1);
  console.log(inputValue2);

  const navigation = useNavigate();
  const { firebaseId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      const db = getDatabase(app);
      const dbRef = ref(db, "nature/fruits/" + firebaseId);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        // setFruitArray(Object.values(snapshot.val()));
        const targetObject = snapshot.val();
        setInputValue1(targetObject.fruitName);
        setInputValue2(targetObject.fruitDesc);
      } else {
        alert("error");
      }

      // setLoading(false);
    };
    fetchData();
  }, [firebaseId]);

  const overWriteData = async () => {
    const db = getDatabase(app);
    // here we get the database access
    const newDocRef = ref(db, "nature/fruits/"+firebaseId);
    // created a folder and inside that created a file, then store in a variable(newDocRef), using  ( ref & push ) command.
    // save data in  key : value pair in the database
    set(newDocRef, {
      fruitName: inputValue1,
      fruitDesc: inputValue2,
    })
      .then(() => {
        alert(" Data save Successfully!");
      })
      .catch((error) => {
        alert("error: " + error.message);
      });
  };

  return (
    <div style={{ background: "#f0f8ff" }}>
      <h1>Hello Tahir write Data</h1>
      <label>
        Enter Fruit Name:
        <input
          type="text"
          value={inputValue1}
          onChange={(e) => setInputValue1(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Enter Fruit Description:
        <input
          type="text"
          value={inputValue2}
          onChange={(e) => setInputValue2(e.target.value)}
        />
      </label>
      <br />
      <br />
      <button style={{ cursor: "pointer" }} onClick={overWriteData}>
        Update
      </button>
      <br /> <br />
      <button style={{ cursor: "pointer" }} onClick={() => navigation("/read")}>
        Check Data in Database!
      </button>
    </div>
  );
}
