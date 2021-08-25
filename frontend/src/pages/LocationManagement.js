import React from 'react'; 
import InventoryLocationTable from '../components/inventoryLocation/InventoryLocationTable';
function LocationManagement() {
        console.log(new Date().toISOString())
    return (
        <div  className="fullwidth">
            <InventoryLocationTable/>
        </div>

    );
}

export default LocationManagement;
