import React from "react";

interface pageProps {
  children: React.FC;
}

const page: React.FC<pageProps> = ({ children }) => {
  return <>{children}</>;
};

export default page;
