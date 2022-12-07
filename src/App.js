import app from './firebase.js';
import './App.css';
import {useState, useEffect} from 'react';
import Dropdown from './Dropdown';
import {getDatabase, ref, onValue, push, remove } from 'firebase/database';
import './fonts/Roboto-Regular.ttf';

function App() {
  //Variables for basic API calls and display
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [amiiboSeries, setAmiiboSeries] = useState('');
  const [releaseNA, setReleaseNA] = useState('');
  const [releaseJP, setReleaseJP] = useState('');
  const [gameSeries, setGameSeries] = useState('');
  const [userInput, setUserInput] = useState('');
  //Basic Variables END
  //Variables for favourites section
  const [favourites, setFavourites] = useState([]);
  //Favourites variables END
  //Following section preforms API call and assigns relevant data
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
//API call and data storage END
//Following manipulates user submission of basic display
const handleChange = (e) => {
  setUserInput(e.target.value)
 }
 const handleSubmit = (e) => {
   e.preventDefault();
   getAmiibo(); 
 }
 //Basic display END
//Following constructs favourites code
useEffect(() =>{
  const database = getDatabase(app);
  const dbRef = ref(database);
  onValue(dbRef, (response) =>{
    const favData =response.val();
    const updatedDbInfo = [];
    for (let key in favData){
      updatedDbInfo.push({key: key, image:favData[key]});
    }
    setFavourites(updatedDbInfo);
  })
},[])
const handleFavSubmit = (event) => {
  event.preventDefault();
  const database = getDatabase(app);
  const dbRef = ref(database);
  push (dbRef, image);
}
const handleRemoveSubmit =(event) => {
  event.preventDefault();
  const database = getDatabase(app);
  const dbRef = ref(database);
  remove (dbRef);
}
//Favourites code END
  return (
    <div className="App wrapper">
      <h1>Amiibo Data Display!</h1>
      <div className="Display">
        <Dropdown handleChange={handleChange}  userInput={userInput} handleSubmit={handleSubmit} />
        <p>Amiibo name: {name}</p>
        <img src={image} alt= 'Amiibo Pic:' />
        <p>Home Series: {gameSeries}</p>
        <p>Amiibo Series: {amiiboSeries}</p>
        <p>North American Release Date: {releaseNA}</p>
        <p>Japanese Release Date: {releaseJP}</p>
      </div>
      <div className="Favourites">
        <button onClick={handleFavSubmit}>Click here to favourite this amiibo!</button>
        <button onClick={handleRemoveSubmit}>Click here to clear your favorites!</button>
        <ul>
        {favourites.map((favourites) => {
          return(
            <li key={favourites.key} className="FavList">
              <img className="FavImg" src={favourites.image} alt="Pic of favourite"/>
            </li>
          )
        })}
      </ul>
      <h2>Favourites appear here</h2>
      </div>
      <footer>Created at Juno College of Technology: https://junocollege.com/</footer>
    </div>
  );
}
// DOM and html display above, along side component used for the dropdown menu
export default App;
