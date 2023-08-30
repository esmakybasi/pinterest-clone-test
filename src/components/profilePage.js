import React from 'react';
import { Navigate } from 'react-router-dom';
import UserProfile from './UserProfile';
import Layout from './layout';

const ProfilePage = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
        <div className="profile-page">
            <h1>Your Profile</h1>
            <UserProfile />
        </div>
    </Layout>
  );
}

export default ProfilePage;
