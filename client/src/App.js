import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Landing from './components/Landing';
import Home from './components/Home';
import PokeCreate from './components/PokeCreate';
import PokeDetails from './components/PokeDetails';

function App() {

  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route exact path = {'/'} element = {<Landing />}/>
        <Route path = {'/home'} element = {<Home />}/>
        <Route path = {'/CreatePokemon'} element = {<PokeCreate />}/>
        <Route path = {'/pokemon/:id'} element = {<PokeDetails />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
