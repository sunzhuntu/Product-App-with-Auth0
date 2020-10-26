import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


const contentStyle = {
  backgroundColor: 'white',
  color: '#800000',
  padding: 10,
  margin: 20,
  fontSize: 16
}

const Users = ({ user, isAuthenticated }) => {
  return (
    isAuthenticated && (
      <div style={contentStyle}>
        <h3> Users </h3>
        <img src={user.picture} alt={user.name} />
        <h4> User Name: {user.name}</h4>
        <p>Email Address: {user.email}</p>
      </div>
    )

  )
}

export default Users