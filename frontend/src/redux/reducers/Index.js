import {combineReducers} from 'redux'
import { InventoryReducer } from './InventoryReducer'
import { InventoryLocationReducer } from './InventoryLocationReducer'
import { ProductReducer } from './ProductReducer'
import { SupplierReducer } from './SupplierReducer'
import { PurchaseReqReducer } from './PurchaseReqReducer'


 const reducer = combineReducers({
    inventoryReducer: InventoryReducer,
    inventoryLocationReducer:InventoryLocationReducer,
    productReducer:ProductReducer,
    supplierReducer:SupplierReducer,
    purchaseReq:PurchaseReqReducer
})

export default reducer