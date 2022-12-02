
import './App.css';
import {useState} from 'react';



function App() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('')

const getAmiibo = async () => {
  const url = new URL ('https://amiiboapi.com/api/amiibo/?id=01010000000e0002');

  // url.search = new URLSearchParams({
  //   q: userInput
  // })

  const res = await fetch(url);
  const data = await res.json();

  // console.log(data);
  console.log(data.amiibo.name)
  console.log(data.amiibo.release.jp)
  console.log(data.amiibo.series)

}

getAmiibo();

// const handleChange = (e) => {
//   setUserInput(e.target.value)
//  }
//  const handleSubmit = (e) => {
//    e.preventDefault();
//    getAmiibo(); 
//  }




 

  return (
    <div className="App">
      <h1>Project Three - Development Initialization</h1>
    </div>
  );
}

export default App;
