import React from 'react'; 
import InventoryLocationTable from '../components/inventoryLocation/InventoryLocationTable';
function LocationManagement() {
        console.log(new Date().toISOString())
    return (
        <div>
            <InventoryLocationTable/>
        </div>

    );
}

export default LocationManagement;
