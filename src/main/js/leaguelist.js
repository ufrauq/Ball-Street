import React from 'react';

var LeagueEntry = React.createClass({
    getInitialState () {
        return {
        }
    },
    render () {
        return (
            <div>
                <b>{this.props.name}</b> {this.props.members}/25
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
                this.setState({message : name + " was already taken..."})
            }
        });
        this.props.callback();
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

export class LeaguePage extends React.Component {

    constructor() {
        super();
        this.state = {leagueEntries: []};
    }

    fetchFromAPI(){
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
                    // If response is NOT OKAY (e.g. 404), clear the statuses.
                    this.setState({leagueEntries: []});
                }
            });
    }

    componentDidMount() {
        this.fetchFromAPI();
    }

    componentWillReceiveProps() {
        this.fetchFromAPI();
    }

    remount() {
        this.fetchFromAPI();
    }

    render() {
        return(
            <div>
                <h1>My Leagues:</h1>
                <h1>All Leagues:</h1>
                {this.state.leagueEntries}
                <h1>Create League:</h1>
                <LeagueCreator callback={this.remount}/>
            </div>
    );
    }
}