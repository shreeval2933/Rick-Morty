import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/navbar/Navbar.jsx';
import Home from './pages/home/Home.jsx';
import SingleCharacter from './pages/singlecharacter/SingleCharacter.jsx';
import Location from './pages/location/Location.jsx';
import Episode from './pages/episode/Episode.jsx';
import SingleLocation from './pages/singlelocation/SingleLocation.jsx';
import SingleEpisode from './pages/singleepisode/SingleEpisode.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='navbar'>
          <Navbar/>
        </div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/singlecharacter/:characterid' element={<SingleCharacter/>} />
          <Route path='/location' element={<Location/>} />
          <Route path='/singlelocation/:locationid' element={<SingleLocation/>} />
          <Route path='/episode' element={<Episode/>} />
          <Route path='/singleepisode/:episodeid' element={<SingleEpisode/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
