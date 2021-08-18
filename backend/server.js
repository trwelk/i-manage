const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const AppConstants  = require('./constants/AppConstants');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/test');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
const inventoryRoutes = require('./routes/Inventory.routes')
const inventoryLocationRoutes = require('./routes/InventoryLocation.routes')
const productRoutes = require('./routes/Product.routes')
const supplierRoutes = require('./routes/Supplier.routes')
const purchaseRequisition = require('./routes/PurchaseRequisition.routes')


const app = new Koa();
app.use(bodyParser());
app.use(cors(corsOptions));

 app.use(inventoryRoutes.routes())
 .use(inventoryRoutes.allowedMethods());
 app.use(inventoryLocationRoutes.routes())
 .use(inventoryLocationRoutes.allowedMethods());
 app.use(productRoutes.routes())
 .use(productRoutes.allowedMethods());
 app.use(supplierRoutes.routes())
 .use(supplierRoutes.allowedMethods());
 app.use(purchaseRequisition.routes())
 .use(purchaseRequisition.allowedMethods());


app.listen(9090);

console.log('Application is running on port 80');