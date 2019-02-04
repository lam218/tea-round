import React, { PureComponent } from "react";
import Modal from "../../components/Modal";
import { withFirebase } from "../../components/Firebase";

class TeaRound extends PureComponent {
  state = {
    email: "",
    friends: [],
    keys: [],
    friendMessage: false,
    showModal: false
  };
  componentDidMount() {
    const { firebase } = this.props;
    firebase.auth.onAuthStateChanged(
      authUser => authUser && this.updateFriendList()
    );
  }
  updateFriendList = () => {
    const { firebase } = this.props;
    firebase.getFriends().then(res => {
      let users = Object.values(res);
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
  toggleModal = shouldShow => {
    this.setState({
      showModal: shouldShow
    });
  };

  render() {
    const { firebase } = this.props;
    const { friends, keys, email, friendMessage, showModal } = this.state;

    return (
      <div>
        <input
          type="email"
          value={this.state.email}
          onChange={e => this.onChange(e, "email")}
        />
        <button
          onClick={() => {
            firebase.addFriend(this.state.email).then(res => {
              if (res === false) {
                this.setState({
                  friendMessage: true,
                  showModal: true
                });
              } else {
                this.updateFriendList();
                this.clearInput();
              }
            });
          }}
        >
          Add friend
        </button>
        <div>
          <h3>Friends</h3>

          {friends.map((friend, i) => (
            <div key={friend.uid}>
              {friend.invited && !friend.accepted && friend.outbound && (
                <p>{friend.email} - Invited</p>
              )}
              {friend.invited && !friend.accepted && !friend.outbound && (
                <div>
                  <p>{friend.email}</p>
                  <button
                    onClick={() => {
                      firebase.acceptFriend(friend, keys[i]);
                      this.updateFriendList();
                    }}
                  >
                    Accept
                  </button>
                </div>
              )}
              {friend.invited && friend.accepted && (
                <div>
                  <p>{friend.email} - in round</p>
                  <span
                    onClick={() => {
                      firebase.removeFriend(friend);
                      this.updateFriendList();
                    }}
                  >
                    x
                  </span>
                </div>
              )}
            </div>
          ))}
          {friendMessage && (
            <Modal toggleModal={() => this.toggleModal} show={showModal}>
              <p>
                It looks like {email} doesn't have an account. Invite them now
              </p>
              <button
                onClick={() => {
                  firebase.inviteFriend(email);
                  this.toggleModal(false);
                }}
              >
                Send Invite email
              </button>
            </Modal>
          )}
        </div>
        <button onClick={() => firebase.initializeTeaRound(this.state.friends)}>
          Trigger Tea Round
        </button>
      </div>
    );
  }
}

export default withFirebase(TeaRound);
