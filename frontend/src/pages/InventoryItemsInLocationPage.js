import React from 'react'; 
import InventoryPartTable from '../components/inventory/InventoryPartTable';
import InvLocationHeaderWithSelector from '../components/inventoryLocation/InvLocationHeaderWithSelector';

function InventoryItemsInLocationPage() {
    
    return (
        <div>
            <InvLocationHeaderWithSelector/>
            <InventoryPartTable/>
        </div>

    );
}

export default InventoryItemsInLocationPage;
