import React, {Component} from "react";
import ChangeForm from "../change-form/change-form.jsx";

class UserDetail extends Component {
  state = {
    user: null,
    userId: this.props.match.params.id
  }

  componentDidMount() {
    const {userId} = this.state
    fetch(`/saturn/saturn/dummyuser/${userId}/change/`)
      .then(response => response.json())
      .then(response => this.setState({user: response}))
  }

  deleteUser = () => {
    console.log("User deleted")
  }

  render() {
    const {user} = this.state
    return (
      <ChangeForm modelObj={user}/>
    )
  }
}

export default UserDetail;
