import {combineReducers} from 'redux'
import { InventoryReducer } from './InventoryReducer'
import { InventoryLocationReducer } from './InventoryLocationReducer'


 const reducer = combineReducers({
    inventoryReducer: InventoryReducer,
    inventoryLocationReducer:InventoryLocationReducer
})

export default reducer