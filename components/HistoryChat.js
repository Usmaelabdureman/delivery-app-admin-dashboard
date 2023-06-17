import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    month: 'March',
   delivered: 2300,
    ordered: 2400,
    revenue: 50000,
  },
  {
    month: 'April',
   delivered: 1200,
    ordered: 1398,
    revenue: 75000,
  },
  {
    month: 'May',
   delivered: 8600,
    ordered: 9800,
    revenue: 22990,
  },
  {
    month: 'June',
   delivered: 2780,
    ordered: 3908,
    revenue: 2000,
  },
  {
    month: 'July',
   delivered: 1890,
    ordered: 4800,
    revenue: 2181,
  },
  {
    month: 'August',
   delivered: 2390,
    ordered: 3800,
    revenue: 2500,
  },
  {
    month: 'September',
   delivered: 3490,
    ordered: 4300,
    revenue: 2100,
  },
];
const currentYear = new Date().getFullYear();
export default class HistoryChart extends PureComponent {
  state = {
    opacity: {
     delivered: 1,
      ordered: 1,
    },
  };

  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  };

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  render() {
    const { opacity } = this.state;

    return (
      <div style={{ width: '100%' }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
            <Line type="monotone" dataKey="ordered" strokeOpacity={opacity.ordered} stroke="#7864ab" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="delivered" strokeOpacity={opacity.delivered} stroke="#82ca0d" />
          </LineChart>
        </ResponsiveContainer>
        <p className="justify-center flex"> 
{currentYear} Data</p>
      </div>
    );
  }
}
