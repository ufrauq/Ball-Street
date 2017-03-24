import React from 'react';

var PlayerEntry = React.createClass({
    getInitialState() {
        return {
            change: 0,
            quantity: 0
        }
    },

    componentDidMount() {
        let change = this.props.price-this.props.pPrice;
        this.setState({change: change});
    },

    qtyChange(e) {
        e.preventDefault();
        this.setState({quantity: e.target.value});
    },

    handleSubmit(e) {
        e.preventDefault();
        let token = JSON.parse(localStorage.authObject).access_token;
        fetch('http://localhost:8080/transaction/createTransaction?firstName=' + this.props.firstName + '&lastName=' + this.props.lastName + '&price=' + this.props.price + '&quantity=' + this.state.quantity + '&tType=buy', {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(response.status);
                if (response.ok) {
                    alert("Successfully bought");
                }
                else {
                    let msg = "Error: " + response.status;
                    switch(response.status) {
                        case 401: msg = "Unauthorized"; break;
                        case 501: msg = "Invalid User..."; break;
                        case 502: msg = "Insufficient balance..."; break;
                        case 503: msg = "Insufficient quantity..."; break;
                        case 504: msg = "Stock is no longer owned..."; break;
                        case 505: msg = "Incorrect transaction type..."; break;
                        case 506: msg = "Invalid quantity..."; break;
                    }
                    alert(msg);
                }
            });
    },

    render() {
        return (
            <tbody>
            <tr>
                <td>{this.props.firstName}</td>
                <td>{this.props.lastName}</td>
                <td>{this.props.team}</td>
                <td>{this.props.price.toFixed(2)}</td>
                <td>{this.state.change.toFixed(2)}</td>
                <td>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Quantity" onChange={this.qtyChange}/>
                        <input type="submit" defaultValue="Buy!"/>
                    </form>
                </td>
            </tr>
            </tbody>
        );
    }

});

var Market = React.createClass({
    getInitialState() {
        return {
            refresh: 1,
            allData: null,
            pageStatus: 0,
            totalResults: 582,
            playerData: [],
            keyword: "",
            pageSize: 50,
            topPlayers: []
        }
    },

    refreshData() {
        let ref = this.state.refresh + 1;
        this.setState({refresh: ref});
    },

    componentDidMount() {
        let token = JSON.parse(localStorage.authObject).access_token;
        fetch('http://localhost:8080/player/getAllPlayers', {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        let result = [];
                        result.push(<thead><tr><th>First Name:</th><th>Last Name:</th><th>Team:</th><th>Price:</th><th>Change:</th><th>Buy!</th></tr></thead>);
                        for (let i = 0; i < json.length && i < 50; i++) {
                            result.push(<PlayerEntry firstName={json[i].firstName} lastName={json[i].lastName} pPrice={json[i].previousDayPrice} price={json[i].currentPrice} team={json[i].team}/>);
                        }
                        this.setState({playerData: result, allData: json});
                    })
                }
            });
        fetch('http://localhost:8080/player/getSuggestedPlayers', {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        let result = [];
                        for (let i = 0; i < json.length; i++) {
                            result.push(<div>{i+1}: {json[i].firstName} {json[i].lastName} {json[i].team} {json[i].currentPrice}</div>);
                        }
                        this.setState({topPlayers: result});
                    })
                }
            });
    },

    callAPI(e) {
        e.preventDefault();
        let keyword = this.state.keyword;
        console.log(keyword + ": calling api with this keyword");
        if (true) {
            let token = JSON.parse(localStorage.authObject).access_token;
            fetch('http://localhost:8080/player/getPlayersByKeyword?keyword='+keyword, {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            let result = [];
                            result.push(<thead><tr><th>First Name:</th><th>Last Name:</th><th>Team:</th><th>Price:</th><th>Change:</th><th>Buy!</th></tr></thead>);
                            for (let i = 0; i < json.length; i++) {
                                result.push(<PlayerEntry firstName={json[i].firstName} lastName={json[i].lastName} pPrice={json[i].previousDayPrice} price={json[i].currentPrice} team={json[i].team}/>);
                            }
                            let pageLength = 50;
                            if (json.length < 50) {
                                pageLength = json.length
                            }
                            this.setState({playerData: []});
                            this.setState({playerData: result, pageStatus: 0, pageSize: pageLength, totalResults: json.length});
                        })
                    }
                });
        }
    },

    updateKeyword(e) {
        e.preventDefault();
        this.setState({keyword: e.target.value});
    },

    next(e) {
        e.preventDefault();
        let current = this.state.pageStatus;
        let total = this.state.totalResults;
        let size = this.state.pageSize;
        if (current < total-50) {
            if (total - current - 50 < 50) {
                size = total - current - 50;
            }
            else {
                size = 50
            }
            let json = this.state.allData;
            let result = [];
            result.push(<thead><tr><th>First Name:</th><th>Last Name:</th><th>Team:</th><th>Price:</th><th>Change:</th><th>Buy!</th></tr></thead>);
            for (let i = current+50; i < json.length && i < current+50+size; i++) {
                result.push(<PlayerEntry firstName={json[i].firstName} lastName={json[i].lastName} pPrice={json[i].previousDayPrice} price={json[i].currentPrice} team={json[i].team}/>);
            }
            this.setState({playerData: []});
            this.setState({playerData: result, pageStatus: current + 50, pageSize: size});
        }
    },

    previous(e) {
        e.preventDefault();
        let current = this.state.pageStatus;
        let size = this.state.pageSize;
        if (50 <= current) {
            size = 50;
            let json = this.state.allData;
            let result = [];
            result.push(<thead><tr><th>First Name:</th><th>Last Name:</th><th>Team:</th><th>Price:</th><th>Change:</th><th>Buy!</th></tr></thead>);
            for (let i = current-50; i < json.length && i < current; i++) {
                result.push(<PlayerEntry firstName={json[i].firstName} lastName={json[i].lastName} pPrice={json[i].previousDayPrice} price={json[i].currentPrice} team={json[i].team}/>);
            }
            this.setState({playerData: []});
            this.setState({playerData: result, pageStatus: current - 50, pageSize: 50});
        }
    },

    render() {
        //puts together all the different components
        return(
            <div>
                <div>{this.state.topPlayers}</div>
                <br/>
                <form onSubmit={this.callAPI} className="searchbar">
                    <input type="text" onChange={this.updateKeyword}/>
                </form>
                <div className="navigator">
                    <button onClick={this.previous} className="navButton">Previous</button>
                    {this.state.pageStatus+1}-{this.state.pageStatus+this.state.pageSize} of {this.state.totalResults}
                    <button onClick={this.next} className="navButton">Next</button>
                </div>
                <table className="marketList">
                    {this.state.playerData}
                </table>
            </div>
        );
    }
});

export class MarketPage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <Market/>
            </div>
        );
    }
}