import {combineReducers} from 'redux'
import { InventoryReducer } from './InventoryReducer'
import { InventoryLocationReducer } from './InventoryLocationReducer'
import { ProductReducer } from './ProductReducer'


 const reducer = combineReducers({
    inventoryReducer: InventoryReducer,
    inventoryLocationReducer:InventoryLocationReducer,
    productReducer:ProductReducer
})

export default reducer