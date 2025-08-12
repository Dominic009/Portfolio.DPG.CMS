import React from "react";
import "./loaderstyle.css";

interface LoaderProps {
  fullScreen?: boolean;
}

const Loader = ({ }: LoaderProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center`}
      style={{ overflow: "hidden" }}
    >
      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loader;
