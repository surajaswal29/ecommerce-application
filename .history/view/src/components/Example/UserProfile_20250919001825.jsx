import React from 'react';
import { useAuth } from '../../hooks/use-auth';

/**
 * Example User Profile Component
 * Demonstrates how to use the useAuth hook
 */
const UserProfile = () => {
  const { 
    user, 
    isAuthenticated, 
    logout, 
    getUserRole, 
    isAdmin,
    getTokenExpiration,
    isTokenExpiringSoon 
  } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }

  const handleLogout = () => {
    logout();
  };

  const tokenExpiration = getTokenExpiration();
  const isExpiringSoon = isTokenExpiringSoon(30); // 30 minutes

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      
      <div className="profile-info">
        <h3>Welcome, {user?.name}!</h3>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {getUserRole()}</p>
        {isAdmin() && <p><em>You have admin privileges</em></p>}
      </div>

      <div className="token-info">
        <h4>Token Information</h4>
        {tokenExpiration && (
          <p>
            <strong>Token expires:</strong> {tokenExpiration.toLocaleString()}
          </p>
        )}
        {isExpiringSoon && (
          <p className="text-warning">
            <strong>Warning:</strong> Your token will expire soon!
          </p>
        )}
      </div>

      <div className="actions">
        <button 
          className="btn btn-danger" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
