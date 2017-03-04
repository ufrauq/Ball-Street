import React from 'react';

var UserAccountCreator = React.createClass({
    getInitialState()
    {
        return {
            userName : "",
            message : "",
            password: ""
        }
    },

    handleNameChange(e) {
        e.preventDefault();
        this.setState({userName : e.target.value});
    },

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({password : e.target.value});
    },

    handleSignup(e) {
        e.preventDefault();
        let name = this.state.userName;
        let password = this.state.password;
        //make call to controller method attempting to create a user and display message based on success or failure status
        fetch("http://localhost:8080/userAccount/createUser?userName=" + name + "&password=" + password/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
            if (response.ok) {
                this.setState({message : name + " was created successfully!"});
            }
            else {
                this.setState({message : name + " was already taken, or missing fields..."});
            }
        });
    },

    handleLogin(e) {
        e.preventDefault();
        let name = this.state.userName;
        let password = this.state.password;
        //make call to controller method attempting to login and display message if failure, otherwise link to home page
        fetch("http://localhost:8080/userAccount/login?userName=" + name + "&password=" + password/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    //if successful then store name, money and netWorth (to be accessed by other pages) and link to home page
                    sessionStorage.setItem("cash", json.money);
                    sessionStorage.setItem("netWorth", json.netWorth);
                    sessionStorage.setItem("username", name);
                    window.location.href='/home';
                    this.setState({message : name + " successfully logged in!"});
                });
            }
            else {
                this.setState({message : "Invalid login credentials"});
            }
        });
    },

    render() {
        //sets up a form for login data input
        return (
            <div>
                    <form onSubmit={this.handleSubmit}>
                        <p className="control is-small">
                            <input className = "input" type="text" placeholder="Username" defaultValue={this.state.userName} onChange={this.handleNameChange}/>
                        </p>
                        <p className="control is-small">
                            <input className = "input" type="password" placeholder = "Password" defaultValue={this.state.password} onChange={this.handlePasswordChange}/>
                            {this.state.message}
                        </p>
                    </form>

                <p className="control is-grouped">
                    <a className="button is-outlined is-danger" onClick={this.handleSignup}>Sign Up</a>
                    <a className="button is-outlined is-success" onClick={this.handleLogin}>Login</a>
                </p>

            </div>
        );
    }
});

export class LoginPage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div>
            <UserAccountCreator/>
            </div>
        );
    }
}