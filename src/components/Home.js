import React from 'react'

const contentStyle = {
  backgroundColor: 'white',
  color: '#800000',
  padding: 10,
  margin: 20,
  fontSize: 16
}
/**
 * use the user and isAuthenticated info provided by Auth0
 */
const Home = ({ user, isAuthenticated }) => {
  return (
    <div style={contentStyle}>
      {!isAuthenticated && (
        <strong> Welcome to Product App! You have not logged in </strong>
      )}
      {isAuthenticated && (
        <strong> Happy to see you, {user.name}! </strong>
      )}
    </div>
  )
}

export default Home