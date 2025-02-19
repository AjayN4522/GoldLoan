import React from 'react'
import "../Styles/Output.css"
import Repayment from '../Components/Charts/Repayment'
import EmiDetails from '../Components/EmiDetails'
import OverDueDetails from '../Components/OverDueDetails'

const Output = ({selectedCard}) => {
  return <div className=''> 
    <div className='Output col-12 p-4'>
        {selectedCard===0 && <EmiDetails />}
        {selectedCard===1 && <OverDueDetails />}
        {selectedCard===2 && <Repayment /> }  
    </div>
  </div>
}

export default Output
