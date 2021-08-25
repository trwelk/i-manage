import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import InventoryItemsInLocationPage from './pages/InventoryItemsInLocationPage';
import ProductManagement from './pages/ProductManagement';
import LocationManagement from './pages/LocationManagement';
import SupplierInsights from './pages/SupplierInsights';
import SupplierManagement from './pages/SupplierManagement';
import LandingPage from './pages/LandingPage';
import Cart from './pages/Cart';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5c5c5c',
      main: '#333333',
      dark: '#0c0c0c',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffbdaf',
      main: '#ff8b80',
      dark: '#c85b53',
      contrastText: '#000',
    },
  },
  typography: {
    fontSize: 10
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
       <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/cart" component={Cart} />
          <Route exact path="/inventory" component={InventoryItemsInLocationPage} />
          <Route exact path="/products" component={ProductManagement} />
          <Route exact path="/locations" component={LocationManagement} />
          <Route exact path="/suppliers/insights" component={SupplierInsights} />
        </Switch>
        <Route exact path="/suppliers" component={SupplierManagement} />
      </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
