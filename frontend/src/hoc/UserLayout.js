import React from 'react';
import UserSideBar from './UserSidebar';


const UserLayout = ({ children }) => {
  return (
    <div style={{  paddingLeft: '220px'}}>
      <UserSideBar />
      {children}
    </div>
  );
};

export default UserLayout;
