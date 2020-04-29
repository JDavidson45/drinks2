import React from 'react'
import {connect} from 'react-redux'
import {Button, Table} from 'react-bootstrap'
import {getAllOrders, setVisibilityFilter} from '../store/orders'
import {Link} from 'react-router-dom'
// import {FilterForm} from './filterForm'

class OrderList extends React.Component {
  componentDidMount() {
    this.props.allOrderList()
  }
  render() {
    return (
      <div>
        <h1>Orders:</h1>
        <Button
          type="button"
          value="All"
          onClick={() => {
            this.props.allOrderList()
          }}
        >
          All
        </Button>
        <Button
          type="button"
          value="Created"
          onClick={() => {
            this.props.visibility(event.target.value)
          }}
        >
          Created
        </Button>
        <Button
          type="button"
          value="Completed"
          onClick={() => {
            this.props.visibility(event.target.value)
          }}
        >
          Completed
        </Button>
        <Button
          type="button"
          value="Processing"
          onClick={() => this.props.visibility(event.target.value)}
        >
          Processing
        </Button>
        <Button
          type="button"
          value="Cancelled"
          onClick={() => this.props.visibility(event.target.value)}
        >
          Cancelled
        </Button>

        <ul>
          {this.props.orders.visibleOrders ? (
            this.props.orders.visibleOrders.map(order => {
              return (
                <div key={order.id}>
                  <Link to={`/orders/${order.id}`}>
                    {/* <h3>User: {order.user.email}</h3>
                      <h3>Status: {order.status}</h3>
                      <div>Date Created: {order.createdAt.slice(0, 10)}</div> */}
                    <Table id="orderTable" striped bordered hover>
                      <thead>
                        <tr>
                          <th>User Email</th>
                          <th>Status</th>
                          <th>Date Created</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{order.user.email}</td>
                          <td>
                            {order.status === null ? 'null' : order.status}
                          </td>
                          <td>{order.createdAt.slice(0, 10)}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Link>
                </div>
              )
            })
          ) : (
            <h1>Loading...</h1>
          )}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    orders: state.orders
  }
}

const mapDispatch = dispatch => ({
  allOrderList: () => dispatch(getAllOrders()),
  visibility: filter => dispatch(setVisibilityFilter(filter))
})

export default connect(mapState, mapDispatch)(OrderList)
