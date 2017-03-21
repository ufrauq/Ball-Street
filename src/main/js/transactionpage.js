import React from 'react';

var TransactionEntry = React.createClass({
    getInitialState () {
        return {
            balanceBefore : 0,
            balanceChange : 0,
            balanceAfter : 0,
            date : null
        }
    },

    componentDidMount() {
        let tType= this.props.tType;
        let price = this.props.stockPrice;
        let quantity = this.props.stockQuantity;
        let balanceBefore = this.props.balanceBefore;
        let status = this.props.tStatus;
        let date = this.props.tDate;
        date = date.substring(0,10);
        if (status != "failed") {
            let tChange = 0;
            if (tType == "sell") {
                tChange = 1 * price * quantity;
            }
            else if (tType == "buy") {
                tChange = -1 * price * quantity;
            }
            let balanceAfter = balanceBefore + tChange;

            this.setState({balanceChange: tChange.toFixed(2), balanceAfter: balanceAfter.toFixed(2), balanceBefore: balanceBefore.toFixed(2), date: date});
        }
        else {
            this.setState({balanceChange: "N/A", balanceAfter: "N/A", balanceBefore: balanceBefore.toFixed(2), date: date});
        }
    },

    render () {
        return (
            <tbody>
            <tr>
                <td>{this.props.id}</td>
                <td>{this.state.date}</td>
                <td>{this.props.tType}</td>
                <td>{this.props.tStatus}</td>
                <td>{this.props.stockName}</td>
                <td>{this.props.stockPrice}</td>
                <td>{this.props.stockQuantity}</td>
                <td>{this.state.balanceBefore}</td>
                <td>{this.state.balanceChange}</td>
                <td>{this.state.balanceAfter}</td>
            </tr>
            </tbody>
        );
    }
});

var TransactionList = React.createClass({
    getInitialState() {
        return {
            transactions : [],
        }
    },

    fetchFromAPI() {
        let token = JSON.parse(localStorage.authObject).access_token;
        let url = this.props.url;
        console.log(token);
        //calls controller method attempting to get transactions and builds transaction list
        fetch('http://localhost:8080/transaction/'+url, {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
            .then(response => {
                console.log(url + response.status);
                if(response.ok) {
                    response.json().then(json => {
                        let results = [];
                        //creates table heading
                        results.push(<thead>
                        <tr>
                            <th rowSpan="2">ID:</th>
                            <th rowSpan="2">Date {this.props.type}:</th>
                            <th rowSpan="2">Type:</th>
                            <th rowSpan="2">Status:</th>
                            <th rowSpan="2">Stock Name:</th>
                            <th rowSpan="2">Price:</th>
                            <th rowSpan="2">Quantity:</th>
                            <th colSpan="3" className="centerAlign">Balance:</th>
                        </tr>
                        <tr>
                            <th>Before:</th>
                            <th>Change:</th>
                            <th>After:</th>
                        </tr>
                        </thead>);
                        if (url == "getPendingTransactions") {
                            for (let i = 0; i < json.length; i++) {
                                results.push(<TransactionEntry id={json[i].transactionID} tDate={json[i].transactionOpened} tType={json[i].tType} tStatus={json[i].tStatus} stockName={json[i].stockFirstName + " " + json[i].stockLastName} stockPrice={json[i].stockPrice} stockQuantity={json[i].stockQuantity} balanceBefore={json[i].balanceBefore}/>);
                            }
                        }
                        else {
                            for (let i = 0; i < json.length; i++) {
                                results.push(<TransactionEntry id={json[i].transactionID} tDate={json[i].transactionClosed} tType={json[i].tType} tStatus={json[i].tStatus} stockName={json[i].stockFirstName + " " + json[i].stockLastName} stockPrice={json[i].stockPrice} stockQuantity={json[i].stockQuantity} balanceBefore={json[i].balanceBefore}/>);
                            }
                        }
                        //this.setState({transactions: []});
                        this.setState({transactions: results});
                    });
                }
                else{
                    this.setState({transactions: []});
                }
            });
    },

    componentDidMount() {
        this.fetchFromAPI();
    },

    /*componentWillReceiveProps() {
        setTimeout(this.fetchFromAPI, 500);
        console.log("here");
    },*/

    sell() {
        let token = JSON.parse(localStorage.authObject).access_token;
        fetch('http://localhost:8080/transaction/createTransaction?firstName=LeBron&lastName=James&price=11&quantity=30&tType=sell', {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
            .then(response => {console.log(response.status)});
    },

    buy() {
        let token = JSON.parse(localStorage.authObject).access_token;
        fetch('http://localhost:8080/transaction/createTransaction?firstName=LeBron&lastName=James&price=11&quantity=30&tType=buy', {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
            .then(response => {console.log(response.status)});
    },

    render() {
        //creates table of league entries
        return(
            <div>
                <table className="transactionList">
                    {this.state.transactions}
                </table>
                <button onClick={this.buy}>Buy</button>
                <button onClick={this.sell}>Sell</button>
            </div>
        )
    }
});

var PlayerEntry = React.createClass({
    getInitialState() {
        return {
        }
    },

    render() {
        return (
          <tbody>
          <tr>
              <td>{this.props.firstName}</td>
              <td>{this.props.lastName}</td>
              <td>{this.props.pPrice}</td>
              <td>{this.props.price}</td>
          </tr>
          </tbody>
        );
    }

});

var Transaction = React.createClass({
    getInitialState() {
        return {
            refresh: 1,
            playerData: []
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
                        result.push(<thead><tr><th>First Name:</th><th>Last Name:</th><th>Previous Price:</th><th>Price:</th></tr></thead>);
                        for (let i = 0; i < json.length; i++) {
                            result.push(<PlayerEntry firstName={json[i].firstName} lastName={json[i].lastName} pPrice={json[i].previousDayPrice} price={json[i].currentPrice}/>);
                        }
                        this.setState({playerData: result});
                    })
                }
            });
    },

    callAPI(e) {
        let keyword = e.target.value;
        console.log(keyword + ": calling api with this keyword");
        if (true) {
            let token = JSON.parse(localStorage.authObject).access_token;
            fetch('http://localhost:8080/player/getPlayersByKeyword?keyword='+keyword, {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            let result = [];
                            result.push(<thead><tr><th>First Name:</th><th>Last Name:</th><th>Previous Price:</th><th>Price:</th></tr></thead>);
                            for (let i = 0; i < json.length; i++) {
                                result.push(<PlayerEntry firstName={json[i].firstName} lastName={json[i].lastName} pPrice={json[i].previousDayPrice} price={json[i].currentPrice}/>);
                            }
                            this.setState({playerData: []});
                            this.setState({playerData: result});
                        })
                    }
                });
        }
    },

    render() {
        //puts together all the different components
        return(
            <div>
                <h1>Pending Transactions</h1>
                <TransactionList type="opened" url="getPendingTransactions" refresh={this.state.refresh} callback={this.refreshData}/>
                <h1>Transaction History</h1>
                <TransactionList type="closed" url="getPastTransactions" refresh={this.state.refresh} callback={this.refreshData}/>
                <form>
                    <input type="text" onChange={this.callAPI}/>
                </form>
                <table>
                    {this.state.playerData}
                </table>
            </div>
        );
    }
});

export class TransactionPage extends React.Component {

    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <Transaction/>
            </div>
        );
    }
}