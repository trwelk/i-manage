import {combineReducers} from 'redux'
import { InventoryReducer } from './InventoryReducer'
import { InventoryLocationReducer } from './InventoryLocationReducer'
import { ProductReducer } from './ProductReducer'
import { SupplierReducer } from './SupplierReducer'


 const reducer = combineReducers({
    inventoryReducer: InventoryReducer,
    inventoryLocationReducer:InventoryLocationReducer,
    productReducer:ProductReducer,
    supplierReducer:SupplierReducer
})

export default reducer