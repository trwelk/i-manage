import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import InventoryPartTable from './components/inventory/InventoryPartTable';

function App() {
  const globalState = useSelector((state) => state);
  console.log(globalState)

  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/inventory" component={InventoryPartTable} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
