import React from "react";
import "./loading.css";

function Loading() {
  return (
    <div className="w-full h-full overflow-hidden bg-bgColor fixed top-0 left-0 z-sixth-Zindex">
      <div className="spinner center z-Seventh-Zindex">
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
        <div className="spinner-blade"></div>
      </div>
    </div>
  );
}

export default Loading;
