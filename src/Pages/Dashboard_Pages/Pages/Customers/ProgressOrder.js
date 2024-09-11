import React from "react";
import { ProgressBar, Step } from "react-step-progress-bar";
import "react-step-progress-bar/styles.css";
import Delivery from "../../../../assets/global/delivery.png";
import { CheckCircleFilled } from "@ant-design/icons";
import { FaLocationDot } from "react-icons/fa6";

const ProgressOrder = ({ currentStep }) => {
  const steps = [
    "Order Placed",
    "Order Accepted",
    "Order Processing",
    "Out for Delivery",
    "Order Delivered",
  ];

  return (
    <>
      <div className="head">
        <p>your order has been delivered</p>
        <img loading="lazy" src={Delivery} alt="delivery" />
      </div>

      <div className="progressBar">
        <ProgressBar
          percent={(currentStep / (steps.length - 1)) * 100}
          filledBackground="#1772FF"
        >
          {steps.map((step, index) => (
            <Step key={index}>
              {() => (
                <div className="parentStep">
                  <div className="step">{step}</div>
                  <div className="stepDot">
                    <CheckCircleFilled />
                  </div>
                </div>
              )}
            </Step>
          ))}
        </ProgressBar>
      </div>

      <div className="address">
        <p>Mirpur-1 (main)</p>
        <p>
          <FaLocationDot /> House # 25, Road No. 2, Block A, Mirpur-1, Dhaka
          1216
        </p>
      </div>
    </>
  );
};

export default ProgressOrder;
