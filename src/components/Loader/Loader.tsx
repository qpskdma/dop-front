import React from "react";
import "./Loader.scss";

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = ({}) => {
  return (
    <div className="loader_container-large">
      <span className="loader"></span>
      <div>Loading...</div>
    </div>
  );
};

export default Loader;
