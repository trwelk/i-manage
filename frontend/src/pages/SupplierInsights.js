import React from 'react'; 
import SuppliersAddedPerMonth from '../components/supplier/SuppliersAddedPerMonth';
import SuppliersCutoffPerMonth from '../components/supplier/SuppliersCutoffPerMonth';
import SuppliersState from '../components/supplier/SuppliersState';
function SupplierInsights() {
    
    return (
        <div>
            <SuppliersAddedPerMonth/>
            <SuppliersCutoffPerMonth/>
            <SuppliersState/>
        </div>

    );
}

export default SupplierInsights;
