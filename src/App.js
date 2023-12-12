import logo from './logo.svg';
import './App.css';
import CharacterCards from './components/characterCards/CharacterCards.jsx';
import TopSection from './components/topSection/TopSection.jsx';

function App() {
  return (
    <div className="App">
      <TopSection/>
      <CharacterCards />
    </div>
  );
}

export default App;
