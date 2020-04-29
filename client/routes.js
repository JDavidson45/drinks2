import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, Product} from './components'
import Products from './components/products'
import UserList from './components/allUserList'
import Cart from './components/Cart-order'
import OrderList from './components/orders'
import SingleUser from './components/singleUser'
import MyProfile from './components/MyProfile'
import LandingPage from './components/LandingPage'
import {me} from './store'
import SingleOrder from './components/SingleOrder'
import {ThankYou} from './components/thankYou'
/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/products/:productId" component={Product} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/cart" component={Cart} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/cart" component={Cart} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/users/:userId" component={SingleUser} />
            <Route exact path="/orders" component={OrderList} />
            <Route exact path="/orders/:orderId" component={SingleOrder} />
            <Route exact path="/users/:userId" component={SingleUser} />
            <Route path="/users/myProfile/:userId" component={MyProfile} />
            <Route path="/thank-you" component={ThankYou} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
