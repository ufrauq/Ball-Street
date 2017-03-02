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
                this.setState({message : name + " was already taken..."});
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
                    <p>Username: </p>
                    <input type="text" defaultValue={this.state.userName} onChange={this.handleNameChange}/>
                    <p>Password: </p>
                    <input type="text" defaultValue={this.state.password} onChange={this.handlePasswordChange}/>
                </form>
                <button type="submit" onClick={this.handleSignup}>Sign Up!</button>
                <button type="submit" onClick={this.handleLogin}>Login!</button>
                <p>
                    Name: {this.state.userName}
                    <br/>
                    Password: {this.state.password}
                    <br/>
                    Message: {this.state.message}
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