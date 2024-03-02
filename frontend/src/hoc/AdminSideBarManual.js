import React from 'react';
import SideBarManual from './SideBarManual';


const AdminSideBarManual = ({ children }) => {
  return (
    < >
      <SideBarManual />
      {/* <h1>hello</h1> */}
      {children}
    </>
  );
};

export default AdminSideBarManual;
