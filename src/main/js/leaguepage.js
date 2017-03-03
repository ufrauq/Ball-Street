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

var LeaveField = React.createClass({
    getInitialState () {
        return {
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        let leagueName = this.props.name;
        let userName = sessionStorage.getItem("username");
        fetch('http://localhost:8080/league/leaveLeague?userName=' + userName + '&leagueName=' + leagueName/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/)
            .then(response => {
                if (response.ok) {
                    alert("Successfully left " + leagueName);
                }
                else {
                    alert("Already left " + leagueName)
                }
            });
    },

    render () {
        return (
            <td>
                <form onSubmit={this.handleSubmit}>
                    <input type="submit" className = "joinLeagueButton" defaultValue="Leave League!"/>
                </form>
            </td>
        );
    }
});

var JoinField = React.createClass({
    getInitialState () {
        return {
            input: "",
            inputPassword: ""
        }
    },

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({inputPassword: e.target.value});
    },

    componentDidMount() {
        let password = this.props.password;
        if (password != null) {
            this.setState({input:<input type="text" placeholder="Enter Password..." onChange={this.handlePasswordChange}/>});
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        let password = this.state.inputPassword;
        let leagueName = this.props.name;
        let userName = sessionStorage.getItem("username");
        fetch('http://localhost:8080/league/joinLeague?userName=' + userName + '&leagueName=' + leagueName + '&password=' + password/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/)
            .then(response => {
               if (response.ok) {
                   alert("Successfully joined " + leagueName);
               }
               else {
                   alert("Invalid password, full league, or already joined " + leagueName);
               }
            });
    },

    render () {
        return (
            <td>
                <form onSubmit={this.handleSubmit}>
                    {this.state.input}
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
            buttonStatus : "+",
            standings : "",
            maxMembers: "",
            joinField: ""
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        let name = this.props.name;
        let status = this.state.buttonStatus;
        if (status == "+") {
            fetch('http://localhost:8080/league/getMembers?leagueName='+ name/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        let results = [];
                        results.push(<tr><th className="rank">Rank:</th><th>Username:</th><th>Cash:</th><th>Net Worth:</th></tr>);
                        for (let i = 0; i < json.length; i++) {
                            results.push(<UserEntry rank={i+1} userName={json[i].username} money={json[i].money} netWorth={json[i].netWorth}/>);
                        }
                        this.setState({userEntries: results, buttonStatus: "-"});
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
                    this.setState({userEntries: [], buttonStatus: "+"});
                    this.setState({standings: ""});
                }
            });
        }
        else {
            this.setState({userEntries: [], buttonStatus: "+"});
            this.setState({standings: ""});
        }

    },

    componentDidMount() {
        let maxMembers = this.props.maxMembers;
        let join =  this.props.join;
        if (maxMembers == -1) {
            this.setState({maxMembers: "", joinField: <td>Default League...</td>});
        }
        else if (join == "false") {
            this.setState({maxMembers: "/" + maxMembers, joinField: <LeaveField name={this.props.name}/>});
        }
        else {
            this.setState({maxMembers: "/" + maxMembers, joinField: <JoinField password={this.props.password} name={this.props.name}/>});
        }
    },

    render () {
        return (
            <tbody>
                <tr>
                    <td className="name">{this.props.name}</td>
                    <td className="members">{this.props.members}{this.state.maxMembers}</td>
                    {this.state.joinField}
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
        let join = "true";
        if (urlExtension != "getLeagues") {
            name = sessionStorage.getItem("username");
            join = "false";
        }
        fetch('http://localhost:8080/league/' + urlExtension + name/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/)
            .then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        let results = [];
                        results.push(<tr><th className="name">League Name:</th><th className="members">Status:</th><th>Join the League:</th><th className="expand">View Standings</th></tr>);
                        for (let i = 0; i < json.length; i++) {
                            results.push(<LeagueEntry name={json[i].name} members={json[i].numMembers} maxMembers={json[i].maxMembers} join={join} password={json[i].password}/>);
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
        window.location.reload(); //temporary way to reload...
        //this.fetchFromAPI(); - doesn't refresh "My Leagues" correctly...
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
            message : "",
            password: ""
        }
    },

    handleNameChange(e) {
        e.preventDefault();
        this.setState({leagueName : e.target.value});
    },

    handlePasswordChange(e) {
        e.preventDefault();
        this.setState({password : e.target.value});
    },

    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.leagueName;
        let owner = sessionStorage.getItem("username");
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

                    <p>Create League Password (blank for public league):</p>
                    <input type="text" defaultValue={this.state.password} onChange={this.handlePasswordChange}/>

                    <p><button  className = "leagueCreateButton">Create League!</button></p>
                </form>
                <p>Name: {this.state.leagueName}
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