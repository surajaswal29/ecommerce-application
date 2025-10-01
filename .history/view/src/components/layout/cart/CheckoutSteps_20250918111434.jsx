import React from 'react'

// MUI Components
import {Typography, Stepper, Step, StepLabel } from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

// CSS File
import "./Shipping.css";

const CheckoutSteps = ({activeStep}) => {

 const steps = [
    {
        label:<Typography>Shipping Details</Typography>,
        icon:<LocalShippingIcon/>
    },
    {
        label:<Typography>Confirm Order</Typography>,
        icon:<LibraryAddCheckIcon/>
    },
    {
        label:<Typography>Payment</Typography>,
        icon:<AccountBalanceIcon/>
    }
 ];

 const stepStyles = {
    boxSizing: "border-box"
 }

  return (
    <>
        <div className='row mt-4'>
            <div className='col-md-12 p-2'>
                <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}> 
                    {
                        steps.map((item,index)=>(
                            <Step key={index} active={activeStep === index? true:false} completed={activeStep > index?true:false}>
                                <StepLabel icon={item.icon}>{item.label}</StepLabel>
                            </Step>
                        ))
                    }
                </Stepper>
            </div>
        </div>
    </>
  )
}

export default CheckoutSteps;