import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data2, setData2] = useState("")
  useEffect(() => {
    fetch('http://localhost:8080').then(response => response.json()).then(data => { setData2(data); console.log(data) });
  }, [])
  return (
    <div className="App">
      {data2.message}
    </div>
  );
}

export default App;
