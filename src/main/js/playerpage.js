/**
 * Created by michellechen on 2017-03-20.
 */

import React from 'react';
import { LineChart, Line , CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';

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
]

var LineGraph = React.createClass({
    render () {
        return (
            <LineChart width={400} height={300} data={testPlayerData}>
                <XAxis dataKey= "Date" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke='#f5f5f5'/>
                <Line type='monotone' dataKey='price' stroke='#ff7300'/>
            </LineChart>
        );
    }
})

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