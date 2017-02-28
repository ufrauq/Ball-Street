import React from 'react';

var UserEntry = React.createClass({
    getInitialState () {
        return {
        }
    },
    render () {
        return (
            <div>
                {this.props.rank} <b>{this.props.userName}</b> {this.props.netWorth}
            </div>
        );
    }
});

var LeagueEntry = React.createClass({
    getInitialState () {
        return {
            userEntries : [],
            buttonStatus : "Expand"
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        let name = this.props.name;
        let status = this.state.buttonStatus;
        if (status == "Expand") {
            fetch('http://localhost:8080/league/getMembers?leagueName='+ name/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        let results = [];
                        for (let i = 0; i < json.length; i++) {
                            results.push(<div><UserEntry rank={i+1} userName={json[i].name} netWorth={json[i].netWorth}/></div>);
                        }
                        this.setState({userEntries: results, buttonStatus: "Collapse"});
                    });
                }
                else{
                    this.setState({userEntries: [], buttonStatus: "Collapse"});
                }
            });
        }
        else {
            this.setState({userEntries: [], buttonStatus: "Expand"});
        }

    },

    render () {
        return (
            <div>
                <b>{this.props.name}</b> {this.props.members}/25
                <button type="button" onClick={this.handleSubmit}>{this.state.buttonStatus}</button>
                {this.state.userEntries}
                <br/>
            </div>
        );
    }
});


var LeagueCreator = React.createClass({
    getInitialState()
    {
        return {
            leagueName : "",
            ownerName : "",
            message : ""
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

    handleSubmit(e) {
        e.preventDefault();
        let name = this.state.leagueName;
        let owner = this.state.ownerName;
        fetch("http://localhost:8080/league/createLeague?ownerName=" + owner + "&leagueName=" + name/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/).then(response => {
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
                    <input type="text" defaultValue={this.state.leagueName} onChange={this.handleNameChange}/>
                    <input type="text" defaultValue={this.state.ownerName} onChange={this.handleOwnerChange}/>
                    <input type="submit" defaultValue="Create League!"/>
                </form>
                Name: {this.state.leagueName}
                <br/>
                Owner: {this.state.ownerName}
                <br/>
                Message: {this.state.message}
            </div>
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
        fetch('http://localhost:8080/league/getLeagues'/*, {method: 'POST', headers: {"Content-Type": "application/json"}}*/)
            .then(response => {
                if(response.ok) {
                    response.json().then(json => {
                        let results = [];
                        for (let i = 0; i < json.length; i++) {
                            results.push(<div><LeagueEntry name={json[i].name} members={json[i].numMembers}/></div>);
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
                <button type="button" onClick={this.handleClick}>Refresh</button>
                {this.state.leagueEntries}
            </div>
        )
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
                <h1>All Leagues:</h1>
                <LeagueList/>
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