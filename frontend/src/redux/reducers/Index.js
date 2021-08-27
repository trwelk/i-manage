import {combineReducers} from 'redux'
import { InventoryReducer } from './InventoryReducer'
import { InventoryLocationReducer } from './InventoryLocationReducer'
import { ProductReducer } from './ProductReducer'
import { SupplierReducer } from './SupplierReducer'
import { PurchaseReqReducer } from './PurchaseReqReducer'
import { OrderReducer } from './OrderReducer'
import { CustomerReducer } from './CustomerReducer'
import { CartReducer } from './CartReducer'


 const reducer = combineReducers({
   
    inventoryReducer: InventoryReducer,
    inventoryLocationReducer:InventoryLocationReducer,
    productReducer:ProductReducer,
    supplierReducer:SupplierReducer,
    purchaseReq:PurchaseReqReducer,
    orderReducer: OrderReducer,
    customerReducer:CustomerReducer,
    cartReducer: CartReducer
})

export default reducer