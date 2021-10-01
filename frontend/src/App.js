import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import InventoryItemsInLocationPage from './pages/InventoryItemsInLocationPage';
import ProductManagement from './pages/ProductManagement';
import LocationManagement from './pages/LocationManagement';
import SupplierInsights from './pages/SupplierInsights';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import SupplierManagement from './pages/SupplierManagement';
import LandingPage from './pages/LandingPage';
import { createTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import SideNav from './components/layout/common/SideNav';
import ContactUs from './pages/ContactUs';
import CustomerSignUp from './pages/CustomerSignUp';
import OrderManagement from './pages/OrderManagement';
import OrderForm from './components/order/OrderForm';
import CashFlowInsights from './pages/CashFlowInsights';
import CashOutflowManagement from './pages/CashOutflowManagement';


import Checkout from './pages/Checkout';
import ProductView from './pages/ProductView';
import Login from './pages/Login';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5c5c5c',
      main: '#333333',
      dark: '#0c0c0c',
      medium: '#aaa',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffbdaf',
      main: '#ff8b80',
      dark: '#c85b53',
      contrastText: '#000',
    },
    admin: {
      main: 'rgba(255,255,255,0.7)'
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ display: "flex" }} class="customerFront">
        <Router>
            <Switch>
              <Route path="/admin" component={SideNav} />
            </Switch>
            <Switch>
              <Route exact path="/admin/inventory" component={InventoryItemsInLocationPage} />
              <Route exact path="/admin/products" component={ProductManagement} />
              <Route exact path="/admin/locations" component={LocationManagement} />
              <Route exact path="/admin/suppliers/insights" component={SupplierInsights} />
              <Route exact path="/admin/suppliers/manage" component={SupplierManagement} />
              <Route exact path="/admin/orders" component={OrderManagement} />
              <Route exact path="/admin/orders/new" component={OrderForm} />
              <Route exact path="/admin/cashflow/insights" component={CashFlowInsights} />
              <Route exact path="/admin/cashflow" component={CashOutflowManagement} />
              <Route exact path="/shop" component={LandingPage} />
              <Route exact path="/shop/cart" component={Cart} />
              <Route exact path="/shop/orderhistory" component={OrderHistory} />
              <Route exact path="/shop/checkout" component={Checkout} />
              <Route exact path="/shop/contactUs" component = {ContactUs}/>
              <Route exact path="/shop/signUp" component = {CustomerSignUp}/>
              <Route exact path="/shop/viewProducts" component = {ProductView}/>
              <Route exact path="/shop/login" component = {Login}/>
            </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
