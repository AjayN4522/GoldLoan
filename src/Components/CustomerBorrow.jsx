import React, { useState } from 'react'
import '../Styles/CustomerBorrow.css'
import Loans from '../json/LoanDetails.json'
import { Link } from 'react-router-dom'

const CustomerBorrow = () => {
  const [data,setData]=useState(Loans)
    // const data = [
    //     { customer_name: "John Doe", loan_amount: 5000 },
    //     { customer_name: "Jane Smith", loan_amount: 12000 },
    //     { customer_name: "Michael Johnson", loan_amount: 8000 },
    //     { customer_name: "Emily Davis", loan_amount: 15000 },
    //     { customer_name: "Chris Brown", loan_amount: 7000 },
    //     { customer_name: "Jessica Wilson", loan_amount: 11000 },
    //     { customer_name: "David Martinez", loan_amount: 9500 },
    //     { customer_name: "Sophia Anderson", loan_amount: 14000 },
    //     { customer_name: "Daniel Thomas", loan_amount: 6000 },
    //     { customer_name: "Olivia Harris", loan_amount: 13000 }
    //   ];
      
  return (
    <div className=''>
      <h6 className='borrowHeading text-lg-start text-center'>Top Borrowed Customer</h6>
    <div className='borrowBorder mt-3 col-12 col-sm-0'>
      <table className='table table-hover'>
        <thead>
        <tr>
            <th className='tableHeading text-lg-start text-center'>Customer</th>
            <th className='tableHeading text-lg-start text-center'>Loan</th>
        </tr>
        </thead>
        <tbody>
        {data.map((d,index)=>{
            
           return <tr className='upComingEmiTable'>
                <td className='tableData text-lg-start text-center py-2 px-2'><Link to="/" className='text-decoration-none text-warning'>{d.first_name}</Link> </td>
                <td className='tableData text-lg-start text-center'><Link to="/" className='text-decoration-none tableData'>{d.loan_amount}</Link></td> 
            </tr>
            
        })}
        </tbody> 
      </table>
    </div>
    </div>
  )
}

export default CustomerBorrow
