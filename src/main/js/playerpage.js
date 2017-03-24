/**
 * Created by michellechen on 2017-03-20.
 */

import React from 'react';
import { LineChart, Line , CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import Select from 'react-select';

const dummyData = [
    {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
    {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
    {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
    {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
    {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
    {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
    {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const testPlayerData = [
    {Date: 'Day 1', price: 3.36},
    {Date: 'Day 2', price: 3.4},
    {Date: 'Day 3', price: 3.76},
    {Date: 'Day 4', price: 3.12},
    {Date: 'Day 5', price: 3.94},
    {Date: 'Day 6', price: 6.32},
    {Date: 'Day 7', price: 10.26},
    {Date: 'Day 8', price: 1.76},
    {Date: 'Day 9', price: 0.31},
    {Date: 'Day 10', price: -3.36},
];

var LineGraph = React.createClass({
    getInitialState() {
        return {
            refresh: 1,
            playerData2: [],
            options: null,
            selected: "",
            graphData: testPlayerData
        }
    },

    componentDidMount() {
        let token = JSON.parse(localStorage.authObject).access_token;
        let options = [];
        fetch('http://localhost:8080/player/getAllPlayers', {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + token}
        })
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        for (let i = 0; i < json.length; i++) {
                            options.push({
                                label: json[i].firstName + " " + json[i].lastName,
                                value: json[i].firstName + " " + json[i].lastName,
                                firstName: json[i].firstName,
                                lastName: json[i].lastName
                            });
                        }
                        this.setState({options: options});
                    })
                }
            });
    },
    callAPI2(firstName, lastName) {
        let token = JSON.parse(localStorage.authObject).access_token;
        fetch('http://localhost:8080/player/getPlayer?lastName='+lastName+"&firstName="+firstName, {method: 'POST', headers: {'Authorization': 'Bearer ' + token}})
            .then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        let result = [];
                        result.push(<thead><tr>
                            <th>First</th>
                            <th>Last</th>
                            <th>#</th>
                            <th>POS</th>
                            <th>Height</th>
                            <th>Weight</th>
                            <th>Age</th>
                            <th>City</th>
                            <th>Name</th>
                            <th>GP</th>
                            <th>REB/GP</th>
                            <th>AST/GP</th>
                            <th>PTS/GP</th>
                            <th>Price</th>
                            <th>Change</th>
                        </tr></thead>);
                        let change = json.currentPrice-json.previousDayPrice;
                        result.push(<tbody><tr>
                            <td>{json.firstName}</td>
                            <td>{json.lastName}</td>
                            <td>{json.jerseyNumber}</td>
                            <td>{json.position}</td>
                            <td>{json.height}</td>
                            <td>{json.weight}</td>
                            <td>{json.age}</td>
                            <td>{json.teamCity}</td>
                            <td>{json.teamName}</td>
                            <td>{json.gp}</td>
                            <td>{json.reb}</td>
                            <td>{json.ast}</td>
                            <td>{json.pts}</td>
                            <td>{json.currentPrice}</td>
                            <td>{change}</td>
                        </tr></tbody>);
                        this.setState({playerData2: []});
                        this.setState({playerData2: result});
                    })
                }
            });
        fetch("http://localhost:8080/player/getPlayerPriceHistory?lastName="+lastName+"&firstName="+firstName, {method: 'POST', headers: {'Authorization': 'Bearer ' + token}}).then(response => {
        if(response.ok) {
            response.json().then(json => {
                //creates table heading
                let testData = [
                    {Date: 'Day 1', price: json[9]},
                    {Date: 'Day 2', price: json[8]},
                    {Date: 'Day 3', price: json[7]},
                    {Date: 'Day 4', price: json[6]},
                    {Date: 'Day 5', price: json[5]},
                    {Date: 'Day 6', price: json[4]},
                    {Date: 'Day 7', price: json[3]},
                    {Date: 'Day 8', price: json[2]},
                    {Date: 'Day 9', price: json[1]},
                    {Date: 'Day 10', price:json[0]},
                ];
                this.setState({graphData:testData});
            });
        }
        else {
            let msg = "Error: " + response.status;
        }
    });
    },


    logChange(val) {
        let x = val.value;
        console.log("Selected: " + x);
        this.setState({selected: x});
        this.callAPI2(val.firstName, val.lastName);
    },

    render () {
        return (

            <div>
                <Select value={this.state.selected} options={this.state.options} onChange={this.logChange}/>
                <table>
                    {this.state.playerData2}
                </table>
                <LineChart width={400} height={300} data={this.state.graphData}>
                    <XAxis dataKey= "Date" />
                    <YAxis />
                    <Tooltip />
                    <CartesianGrid stroke='#f5f5f5'/>
                    <Line type='monotone' dataKey='price' stroke='#ff7300'/>
                </LineChart>
            </div>
        );
    }
});

export class Graph extends React.Component {
    constructor() {
        super();
    }

    render() {
        return(
            <div>
                <LineGraph/>
            </div>
        );
    }
}