import {combineReducers} from 'redux'
import { InventoryReducer } from './InventoryReducer'


 const reducer = combineReducers({
    inventoryReducer: InventoryReducer
})

export default reducer