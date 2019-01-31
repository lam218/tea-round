import React, { PureComponent } from "react";
import { withFirebase } from "../../components/Firebase";

class TeaRound extends PureComponent {
  state = {
    email: "",
    friends: [],
    keys: []
  };
  componentWillReceiveProps() {
    const { firebase } = this.props;
    firebase.auth.onAuthStateChanged(
      authUser => authUser && this.updateFriendList()
    );
  }
  updateFriendList = () => {
    const { firebase } = this.props;
    firebase.getFriends().then(res => {
      let users = Object.values(res).map(friend => friend.email);
      let keys = Object.keys(res);
      this.setState({
        friends: users,
        keys: keys
      });
    });
  };
  onChange = (e, key) => {
    this.setState({
      [key]: e.target.value
    });
  };
  clearInput = () => {
    this.setState({
      email: ""
    });
  };

  render() {
    const { firebase } = this.props;
    const { friends, keys } = this.state;

    return (
      <div>
        <input
          type="email"
          value={this.state.email}
          onChange={e => this.onChange(e, "email")}
        />
        <button
          onClick={() => {
            firebase.addFriend(this.state.email);
            this.clearInput();
            this.updateFriendList();
          }}
        >
          Add friend
        </button>
        <div>
          <h3>Friends</h3>
          {Object.values(friends).map((friend, i) => (
            <div key={keys[i]}>
              <p>{friend}</p>
              <span
                onClick={() => {
                  firebase.removeFriend(friend, keys[i]);
                  this.updateFriendList();
                }}
              >
                x
              </span>
            </div>
          ))}
        </div>
        <button onClick={() => firebase.initializeTeaRound(this.state.friends)}>
          Trigger Tea Round
        </button>
      </div>
    );
  }
}

export default withFirebase(TeaRound);
