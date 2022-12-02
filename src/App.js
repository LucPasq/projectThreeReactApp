
import './App.css';
import {useState} from 'react';
import Dropdown from './Dropdown';
function App() {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [amiiboSeries, setAmiiboSeries] = useState('');
  const [releaseNA, setReleaseNA] = useState('');
  const [releaseJP, setReleaseJP] = useState('');
  const [gameSeries, setGameSeries] = useState('');
  const [userInput, setUserInput] = useState('');
const getAmiibo = async () => {
  const url = new URL (`https://amiiboapi.com/api/amiibo/${userInput}`);
  const res = await fetch(url);
  const data = await res.json();
  setName(data.amiibo.name);
  setImage(data.amiibo.image);
  setAmiiboSeries(data.amiibo.amiiboSeries);
  setReleaseNA(data.amiibo.release.na);
  setReleaseJP(data.amiibo.release.jp);
  setGameSeries(data.amiibo.gameSeries);
}
const handleChange = (e) => {
  setUserInput(e.target.value)
 }
 const handleSubmit = (e) => {
   e.preventDefault();
   getAmiibo(); 
 }
  return (
    <div className="App">
      <h1>Project Three - Development Initialization</h1>
      <div className="Display">
        <Dropdown handleChange={handleChange}  userInput={userInput} handleSubmit={handleSubmit} />
        <p>Amiibo name: {name}</p>
        <img src={image} alt= 'pic of the amiibo' />
        <p>Home Series: {gameSeries}</p>
        <p>Amiibo Series: {amiiboSeries}</p>
        <p>North American Release Date: {releaseNA}</p>
        <p>Japanese Release Date: {releaseJP}</p>
      </div>
    </div>
  );
}
export default App;
