import { useEffect, useState } from "react";

function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch("/api/lists")
      .then(res => res.json())
      .then(data => setLists(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{
      fontFamily: "Arial, sans-serif",
      textAlign: "center",
      marginTop: "50px",
      backgroundColor: "#f9f9f9",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{ color: "#4a90e2" }}>Mes tâches MERN depuis MongoDB Atlas</h1>
      <ul style={{
        listStyle: "none",
        padding: 0,
        maxWidth: "600px",
        margin: "20px auto"
      }}>
        {lists.map(list => (
          <li key={list._id} style={{
            backgroundColor: "#fff",
            padding: "15px 20px",
            marginBottom: "10px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            textAlign: "left"
          }}>
            <strong style={{ color: "#333" }}>{list.title}</strong>
            <p style={{ margin: "5px 0 0", color: "#666" }}>{list.body}</p>
          </li>
        ))}
      </ul>
      {lists.length === 0 && <p style={{ color: "#999" }}>Aucune tâche disponible...</p>}
    </div>
  );
}

export default App;
