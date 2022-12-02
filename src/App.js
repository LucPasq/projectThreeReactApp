import app from './firebase.js';
import './App.css';
import {useState, useEffect} from 'react';
import Dropdown from './Dropdown';
import {getDatabase, ref, onValue, push, remove } from 'firebase/database';

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
  // const [userFavInput, setUserFavInput] = useState('');

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
      updatedDbInfo.push(favData[key]);
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
      <div className="Favourites">
        <button onClick={handleFavSubmit}>Click here to favourite this amiibo!</button>
        <button onClick={handleRemoveSubmit}>Click here to clear your favorites!</button>
        <ul>
          <h2>Favourites bar!</h2>
        {favourites.map((favourites) => {
          return(
            <li className="FavList">
              <img className="FavImg" src={favourites} alt="favourites appear here!"/>
            </li>
          )
        })}
      </ul>
      </div>
    </div>
  );
}
export default App;
