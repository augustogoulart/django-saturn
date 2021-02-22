import React,{ Component } from "react";
import { Button } from "antd";

class UserDetail extends Component {
  state = {
    user: null,
    userId: this.props.match.params.id
  }

  componentDidMount() {
    const { userId } = this.state
    fetch(`/api/users/${userId}/`)
      .then(response => response.json())
      .then(response => this.setState({user: response}))
  }

  deleteUser= () => {
    console.log("User deleted")
  }

  render() {
    const {user} = this.state
    return(
      <>
        <div>Name: {user ? user.name : null}</div>
        <hr/>
        <Button type={"primary"} onClick={this.deleteUser}>Delete</Button>
      </>
    )
  }
}

export default UserDetail;
