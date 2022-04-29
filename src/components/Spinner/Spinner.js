import React from "react";
import "./Spinner.scss";
import { ClimbingBoxLoader } from "react-spinners";

export default function Spinner({ size = 25 }) {
  return (
    <div className="spinner">
      <ClimbingBoxLoader color="#2A5DB0" size={size} />
    </div>
  );
}
