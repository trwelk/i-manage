import React from 'react'; 
import InventoryPartTable from '../components/inventory/InventoryPartTable';
import InvLocationHeaderWithSelector from '../components/inventoryLocation/InvLocationHeaderWithSelector';

function InventoryItemsInLocationPage() {
    
    return (
        <div className="fullwidth">
            <InvLocationHeaderWithSelector/>
            <InventoryPartTable/>
        </div>

    );
}

export default InventoryItemsInLocationPage;
