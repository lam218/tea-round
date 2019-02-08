import React, { PureComponent } from "react";
import Modal from "../../components/Modal";
import { withFirebase } from "../../components/Firebase";
import { withRouter } from "react-router-dom";

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
  checkDepth = object => {
    let level = 1;
    let key;
    for (key in object) {
      if (!object.hasOwnProperty(key)) continue;

      if (typeof object[key] == "object") {
        let depth = this.checkDepth(object[key]) + 1;
        level = Math.max(depth, level);
      }
    }
    return level;
  };
  updateFriendList = () => {
    const { firebase } = this.props;

    firebase.Friends.getFriends().then(res => {
      let depth = this.checkDepth(res);
      if (depth === 1 && (res.length && res.length !== 0)) {
        this.setState({
          friends: [res]
          //keys: keys
        });
      } else if (depth > 1) {
        let users = Object.values(res);
        let keys = Object.keys(res);
        this.setState({
          friends: users,
          keys: keys
        });
      } else {
        this.setState({
          friends: []
        });
      }
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
    const { firebase, history } = this.props;
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
            firebase.Friends.addFriend(this.state.email).then(res => {
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

          {friends.length > 0 ? (
            friends.map((friend, i) => (
              <div key={friend.uid}>
                {friend.invited && !friend.accepted && friend.outbound && (
                  <p>{friend.email} - Invited</p>
                )}
                {friend.invited && !friend.accepted && !friend.outbound && (
                  <div>
                    <p>{friend.email}</p>
                    <button
                      onClick={() => {
                        firebase.Friends.acceptFriend(friend, keys[i]);
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
                        firebase.Friends.removeFriend(friend, keys[i]);
                        this.updateFriendList();
                      }}
                    >
                      x
                    </span>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>
              <p>Looks like you don't have any friends :(</p>
            </div>
          )}
          {friendMessage && (
            <Modal toggleModal={() => this.toggleModal} show={showModal}>
              <p>
                It looks like {email} doesn't have an account. Invite them now
              </p>
              <button
                onClick={() => {
                  firebase.Friends.inviteFriend(email);
                  this.toggleModal(false);
                }}
              >
                Send Invite email
              </button>
            </Modal>
          )}
        </div>
        <button
          onClick={() => {
            firebase.Drinks.initializeTeaRound(this.state.friends);
            history.push(`/teaRound?${firebase.auth.currentUser.uid}`);
          }}
        >
          Trigger Tea Round
        </button>
      </div>
    );
  }
}

export default withRouter(withFirebase(TeaRound));
