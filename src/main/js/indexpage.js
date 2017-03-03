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
        fetch("http://localhost:8080/userAccount/createUser?userName=" + name + "&password=" + password/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
            if (response.ok) {
                this.setState({message : name + " was created successfully!"});
            }
            else {
                this.setState({message : name + " was already taken, or invalid  password..."});
            }
        });
    },

    handleLogin(e) {
        e.preventDefault();
        let name = this.state.userName;
        let password = this.state.password;
        fetch("http://localhost:8080/userAccount/login?userName=" + name + "&password=" + password/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    sessionStorage.setItem("cash", json.money);
                    sessionStorage.setItem("netWorth", json.netWorth);
                    sessionStorage.setItem("username", name);
                    this.setState({message : name + " logged in successfully!"});
                    window.location.href='/home';
                });
            }
            else {
                this.setState({message : "Invalid Credentials"});
            }
        });
    },

    render() {
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

                <p className = "control is-grouped">
                    <a className = "button is-outlined is-danger"  onClick={this.handleSignup}>Sign Up</a>
                    <a className = "button is-outlined is-success" onClick={this.handleLogin}>Login</a>
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