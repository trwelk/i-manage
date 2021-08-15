import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import InventoryPartTable from './components/inventory/InventoryPartTable';
import InventoryItemsInLocationPage from './pages/InventoryItemsInLocationPage';

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/inventory" component={InventoryItemsInLocationPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
