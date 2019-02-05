import React from "react";
import { withFirebase } from "../../components/Firebase";

class Choice extends React.PureComponent {
  state = {
    drinks: [],
    drinkChoice: null,
    notes: "",
    updating: false
  };
  teaRoundUid = window.location.search.split("?")[1];
  componentDidMount() {
    this.getDrinks();
  }
  getDrinks = () => {
    this.props.firebase.getDrinks(this.teaRoundUid).then(res => {
      let drinks = Object.values(res).map((drink, i) => ({
        ...drink,
        key: Object.keys(res)[i]
      }));
      this.setState({
        drinks
      });
    });
  };
  setDrinkChoice = choice => {
    this.setState({
      drinkChoice: choice
    });
  };
  onChange = (e, key) =>
    this.setState({
      [key]: e.target.value
    });
  toggleUpdating = shouldUpdate => {
    this.setState({
      updating: shouldUpdate
    });
  };
  render() {
    const { firebase, teaRoundUid } = this.props;
    const {
      drinks,
      drinkChoice,
      notes,
      updating,
      changeDrink,
      changeNotes
    } = this.state;

    return (
      <div>
        <button onClick={() => this.setDrinkChoice("tea")}>Tea</button>
        <button onClick={() => this.setDrinkChoice("coffee")}>Coffee</button>
        <button onClick={() => this.setDrinkChoice("other")}>Other</button>
        {drinkChoice && (
          <label>
            Notes:
            <input
              placeholder="any preferences, e.g. 1 sugar, soya milk"
              onChange={e => this.onChange(e, "notes")}
            />
            <button
              onClick={() => {
                firebase.addDrink(drinkChoice, this.teaRoundUid, notes);
                this.getDrinks();
              }}
            >
              Order {drinkChoice}
            </button>
          </label>
        )}
        <div>
          <h2>Drinks</h2>
          {drinks.map(drink => (
            <div key={drink.key}>
              <p>{drink.email}</p>
              {updating === drink.key ? (
                <div>
                  <input
                    placeholder={drink.drink}
                    onChange={e => this.onChange(e, "changeDrink")}
                  />
                  <input
                    placeholder={drink.notes}
                    onChange={e => this.onChange(e, "changeNotes")}
                  />
                </div>
              ) : (
                <p>
                  {drink.drink}
                  {drink.notes && ` - ${drink.notes}`}
                </p>
              )}
              <button
                onClick={() => {
                  if (updating) {
                    firebase
                      .updateDrink(
                        this.teaRoundUid,
                        drink.key,
                        changeDrink,
                        changeNotes
                      )
                      .then(() => {
                        this.toggleUpdating(false);
                        this.getDrinks();
                      });
                  }
                  this.toggleUpdating(drink.key);
                }}
              >
                Update
              </button>
              {updating && (
                <button onClick={() => this.toggleUpdating(false)}>Undo</button>
              )}
              <button
                onClick={() => {
                  firebase.removeDrink(this.teaRoundUid, drink.key);
                  this.getDrinks();
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withFirebase(Choice);
