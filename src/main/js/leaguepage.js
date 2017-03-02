import React from 'react';

var UserEntry = React.createClass({
    getInitialState () {
        return {
        }
    },
    render () {
        return (
        <tr className="standingsRow">
            <td>{this.props.rank}</td>
            <td>{this.props.userName}</td>
            <td>{this.props.money}</td>
            <td>{this.props.netWorth}</td>
        </tr>
        );
    }
});

var JoinField = React.createClass({
    getInitialState () {
        return {
            password: ""
        }
    },

    /*componentDidMount() {
        let passwordState = this.props.passwordRequired;
        if (passwordState == "true") {
            this.setState({input:<input type="text" defaultValue="Enter Password..."/>});
        }
    },*/

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({password: e.getValue()});
    },

    handleSubmit(e) {
        e.preventDefault();
        let password = this.state.password;
        let leagueName = this.props.name;
        let userName = sessionStorage.getItem("username");
        fetch('http://localhost:8080/league/joinLeague?userName=' + userName + '&leagueName=' + leagueName + '&password=' + password/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/);
    },

    render () {
        return (
            <td>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" defaultValue="Enter Password..."/>
                    <input type="submit" className = "joinLeagueButton" defaultValue="Join League!"/>
                </form>
            </td>
        );
    }
});

var LeagueEntry = React.createClass({
    getInitialState () {
        return {
            userEntries : [],
            buttonStatus : "View",
            standings : "",
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        let name = this.props.name;
        let status = this.state.buttonStatus;
        if (status == "View") {
            fetch('http://localhost:8080/league/getMembers?leagueName='+ name/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        let results = [];
                        results.push(<tr><th className="rank">Rank:</th><th>Username:</th><th>Cash:</th><th>Net Worth:</th></tr>);
                        for (let i = 0; i < json.length; i++) {
                            results.push(<UserEntry rank={i+1} userName={json[i].username} money={json[i].money} netWorth={json[i].netWorth}/>);
                        }
                        this.setState({userEntries: results, buttonStatus: "Close"});
                        this.setState({standings:
                        <tr>
                            <td colSpan="4">
                                <table className="userList">
                                    {this.state.userEntries}
                                </table>
                            </td>
                        </tr>});
                    });
                }
                else{
                    this.setState({userEntries: [], buttonStatus: "View"});
                    this.setState({standings: ""});
                }
            });
        }
        else {
            this.setState({userEntries: [], buttonStatus: "View"});
            this.setState({standings: ""});
        }

    },

    render () {
        return (
            <tbody>
                <tr>
                    <td className="name">{this.props.name}</td>
                    <td className="members">{this.props.members}/25</td>
                    <JoinField passwordRequired="true" name={this.props.name}/>
                    <td className="expand"><button type="submit" className="viewButton" onClick={this.handleSubmit}>{this.state.buttonStatus}</button></td>
                </tr>
                {this.state.standings}
            </tbody>
        );
    }
});

var LeagueList = React.createClass({
    getInitialState() {
        return {
            leagueEntries : [],
        }
    },

    fetchFromAPI() {
        let urlExtension = this.props.url;
        let name = "";
        if (urlExtension != "getLeagues") {
            name = sessionStorage.getItem("username");
        }
        fetch('http://localhost:8080/league/' + urlExtension + name/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/)
            .then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        let results = [];
                        results.push(<tr><th className="name">League Name:</th><th className="members">Status:</th><th>Join the League:</th><th classname="expand">View Standings</th></tr>);
                        for (let i = 0; i < json.length; i++) {
                            results.push(<LeagueEntry name={json[i].name} members={json[i].numMembers}/>);
                        }
                        this.setState({leagueEntries: results});
                    });
                }
                else{
                    this.setState({leagueEntries: []});
                }
            });
    },

    componentDidMount() {
        this.fetchFromAPI();
    },

    handleClick(e) {
        e.preventDefault();
        this.fetchFromAPI();
    },

    render() {
        return(
            <div>
                <button type="button" className = "refreshButton" onClick={this.handleClick}>Refresh</button>
                <table className="leagueList">
                    {this.state.leagueEntries}
                </table>
            </div>
        )
    }
});


var LeagueCreator = React.createClass({
    getInitialState()
    {
        return {
            leagueName : "",
            ownerName : "",
            message : "",
            password: ""
        }
    },

    handleNameChange(e) {
        e.preventDefault();
        this.setState({leagueName : e.target.value});
    },

    handleOwnerChange(e) {
        e.preventDefault();
        this.setState({ownerName : e.target.value});
    },

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({password : e.target.value});
    },

    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.leagueName;
        let owner = this.state.ownerName;
        let password = this.state.password;
        fetch("http://localhost:8080/league/createLeague?ownerName=" + owner + "&leagueName=" + name +"&password=" + password/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
            if (response.ok) {
                this.setState({message : name + " was created successfully!"});
            }
            else {
                this.setState({message : name + " was already taken..."});
            }
        });
    },

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>

                    <p>Enter a League Name:</p>
                    <input type="text" defaultValue={this.state.leagueName} onChange={this.handleNameChange}/>

                    <p>Enter the League Owner Name:</p>
                    <input type="text" defaultValue={this.state.ownerName} onChange={this.handleOwnerChange}/>

                    <p>Create League Password:</p>
                    <input type="text" defaultValue={this.state.password} onChange={this.handlePasswordChange}/>

                    <p><button  className = "leagueCreateButton">Create League!</button></p>
                </form>
                <p>Name: {this.state.leagueName}
                <br/>
                Owner: {this.state.ownerName}
                <br/>
                Message: {this.state.message}
                </p>
            </div>
        );
    }
});

var League = React.createClass({
    getInitialState() {
        return {
        }
    },

    render() {
        return(
            <div>
                <h1>My Leagues:</h1>
                <LeagueList url="getMyLeagues?username="/>
                <h1>All Leagues:</h1>
                <LeagueList url="getLeagues"/>
                <h1>Create League:</h1>
                <LeagueCreator/>
            </div>
        );
    }
});

export class LeaguePage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <League/>
            </div>
        );
    }
}