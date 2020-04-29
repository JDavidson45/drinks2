import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isAdmin} = props

  return (
    <div>
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">20% off all Bourbons!</h1>
          <p class="lead">
            We're so excited for you to join us! Take advantage of all our
            liquors from across the globe
          </p>
        </div>
      </div>
      <div>
        {!isAdmin ? (
          <h3 className="animated fadeIn">Welcome, {email}</h3>
        ) : (
          <div>
            <h3>Welcome, admin {email}</h3>
            <Link to="/users">All Users</Link>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isAdmin: state.user.isAdmin
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
