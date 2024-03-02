import React from 'react';
import SideBar from './SideBar';


const AdminLayout = ({ children }) => {
  return (
    < >
      <SideBar />
      {/* <h1>hello</h1> */}
      {children}
    </>
  );
};

export default AdminLayout;
