import React from 'react';
import TechnicalSideBar from './TechnicalSideBar';


const AdminTechnicalSideBar = ({ children }) => {
  return (
    < >
      <TechnicalSideBar />
      {/* <h1>hello</h1> */}
      {children}
    </>
  );
};

export default AdminTechnicalSideBar;
