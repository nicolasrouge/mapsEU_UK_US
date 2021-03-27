import { Component } from 'react';
import './App.css';
import FirstPage from "./components/FirstPage/FirstPage";
import NavBar from "./components/NavBar/NavBar.jsx";

class App extends Component {

  render() {
    
    return (
      <div className='App'>

        <NavBar />
        
        
      </div>
    );
  }

}

export default App;