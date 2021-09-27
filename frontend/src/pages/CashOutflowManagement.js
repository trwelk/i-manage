import React from 'react'; 
import CashOutflowTable from '../components/purchaseReq/CashOutflowTable';
function CashOutflowManagement() {
        console.log(new Date().toISOString())
    return (
        <div  className="fullwidth" style={{width:"95%"}}>
            <CashOutflowTable/>
        </div>

    );
}

export default CashOutflowManagement;
