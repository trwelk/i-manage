import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import InventoryPartTable from './components/inventory/InventoryPartTable';
import InventoryItemsInLocationPage from './pages/InventoryItemsInLocationPage';
import ProductManagement from './pages/ProductManagement';
import LocationManagement from './pages/LocationManagement';

function App() {
  return (
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/inventory" component={InventoryItemsInLocationPage} />
          <Route exact path="/products" component={ProductManagement} />
          <Route exact path="/locations" component={LocationManagement} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
