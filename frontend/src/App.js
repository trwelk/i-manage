import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import InventoryItemsInLocationPage from './pages/InventoryItemsInLocationPage';
import ProductManagement from './pages/ProductManagement';
import LocationManagement from './pages/LocationManagement';
import SupplierInsights from './pages/SupplierInsights';
import Cart from './pages/Cart';
import SupplierManagement from './pages/SupplierManagement';
import LandingPage from './pages/LandingPage';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SideNav from './components/layout/common/SideNav';
import Navbar from './components/common/Navbar';

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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: "flex" }}>

        <Router>
            <Switch>
              <Route path="/admin" component={SideNav} />
              <Route path="/shop" component={Navbar} />
            </Switch>

            <Switch>
              <Route exact path="/admin/inventory" component={InventoryItemsInLocationPage} />
              <Route exact path="/admin/products" component={ProductManagement} />
              <Route exact path="/admin/locations" component={LocationManagement} />
              <Route exact path="/admin/suppliers/insights" component={SupplierInsights} />
              <Route exact path="/admin/suppliers/manage" component={SupplierManagement} />
              <Route exact path="/shop" component={LandingPage} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
