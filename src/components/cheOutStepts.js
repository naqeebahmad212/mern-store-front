import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Fragment } from "react";
import {
  MdAccountBalance,
  MdLibraryAdd,
  MdLocalShipping,
} from "react-icons/md";
// import './shipping.css'

const CheckoutSteps = ({ activeStep }) => {
  const steps = [
    {
      label: <Typography>Shipping Deatils</Typography>,
      icon: <MdLocalShipping />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <MdLibraryAdd />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <MdAccountBalance />,
    },
  ];

  const stepStyel = {
    boxSizing: "border-box",
  };
  return (
    <div className="mt-3">
      <Fragment>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyel}>
          {steps.map((item, index) => (
            <Step
              key={index}
              active={activeStep === index ? true : false}
              completed={activeStep >= index ? true : false}
            >
              <StepLabel
                style={{
                  color: activeStep >= index ? "tomato" : "rgba(0,0,0,0.649",
                }}
                icon={item.icon}
              >
                {" "}
                {item.label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Fragment>
    </div>
  );
};

export default CheckoutSteps;
