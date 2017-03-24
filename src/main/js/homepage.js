/**
 * Created by michellechen on 2017-03-20.
 */
import React from 'react';
import { LineChart, Line , CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

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
    getInitialState () {
        return {
            graphData: null
        }
    },

    componentDidMount(){
        let token = JSON.parse(localStorage.authObject).access_token;
        fetch("http://localhost:8080/portfolio/getBalanceHistory", {method: 'POST', headers: {'Authorization': 'Bearer ' + token}}).then(response => {
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

    render () {
        return (
            <LineChart width={400} height={300} data={this.state.graphData}>
                <XAxis dataKey= "Date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke='#f5f5f5'/>
                <Line type='monotone' dataKey='price' stroke='red'/>
            </LineChart>
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