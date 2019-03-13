import React from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardSubtitle, Row, Col } from 'reactstrap';
import { timingSafeEqual } from 'crypto';
import { createTicketAPICall } from '../actions/TicketActions'
import { connect } from 'react-redux';
import victory from "victory";
import {
  VictoryBar,
  VictoryChart,
  VictoryLine,
  VictoryPie, VictoryGroup, VictoryLegend
} from "victory";

import { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line,
  PieChart, Pie, Sector
} from 'recharts';

const pieGraphData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const lineGraphData = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

const barGraphdata = [
  {
    name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
  },
  {
    name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
  },
  {
    name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
  },
  {
    name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
  },
  {
    name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
  },
  {
    name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
  },
];

class DashBoardForm extends React.Component {

  constructor(props) {
    super(props);

    //State
    this.state = {
      opacity: {
        uv: 1,
        pv: 1
      }
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

  }

  handleMouseEnter = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  }

  handleMouseLeave = (o) => {
    const { dataKey } = o;
    const { opacity } = this.state;

    this.setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }




  render() {
    console.log(this.props);
    const { opacity } = this.state;
    return (
      <div>
        <Row style={{marginTop:'3%', marginLeft:'1%', marginRight:'1%'}}>
          <Col style={{ width: '33%' }}>
          <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
          </Col>
          <Col style={{ width: '33%' }}>
          <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
          </Col>
          <Col style={{ width: '33%' }}>
          <Card>
        <CardBody>
          <CardTitle>Card title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
          <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          <Button>Button</Button>
        </CardBody>
      </Card>
          </Col>
          
        </Row>
        <Row style={{marginTop:'3%', marginLeft:'1%', marginRight:'1%'}}>
          <Col style={{ width: '60%' }}>
            <Card style={{ backgroundColor: '#fff' }}>
              <CardBody>
                <CardTitle>Ticket Statistics by Status</CardTitle>
                <BarChart
                  barGap={1} 
                  width={500}
                  height={300}
                  barSize={8}
                  data={barGraphdata}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" fontSize={11} tick={{stroke: '#6E6E6E', strokeWidth: 0.1, fontFamily:'Roboto,Helvetica Neue,Arial,sans-serif'}}/>
                  <YAxis fontSize={12}  label={{  value: 'Ticket Count', angle: -90, position: 'insideLeft' }}/>
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </CardBody>
            </Card>
          </Col>
          <Col style={{ width: '40%' }}>
            <Card style={{ backgroundColor: '#fff' }}>
              <CardBody>
                <CardTitle>Department-wise workload</CardTitle>
                <PieChart width={500} height={300}>
                  <Pie
                    data={pieGraphData}
                    cx={150}
                    cy={100}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {
                      pieGraphData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                  </Pie>
                  <Tooltip/>
                  <Legend verticalAlign='bottom' align='left' layout='horizontal'/>
                </PieChart>
              </CardBody>
            </Card>

          </Col>

        </Row>
        <Row style={{marginTop:'3%', marginLeft:'1%', marginRight:'1%'}}>
          <Col style={{ width: '100%' }}>
            <Card style={{ backgroundColor: '#fff' }}>
              <CardBody>
                <CardTitle>Department-wise workload</CardTitle>
                <LineChart
                  width={500}
                  height={300}
                  data={lineGraphData}
                  margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} />
                  <Line type="monotone" dataKey="pv" strokeOpacity={opacity.pv} stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="uv" strokeOpacity={opacity.uv} stroke="#82ca9d" />
                </LineChart>
              </CardBody>
            </Card>

          </Col>
        </Row>

      </div>


    );
    /* return (
      <div >
      <h1>Number of Ticket fixed</h1>
      <VictoryChart style={{ parent: { maxWidth: "50%" } }}>
        <VictoryBar barWidth={20} style={{ labels: {
        fontSize: 15
      }, data: { fill: "#6DB65B" } }} data={[
      { x: "lizard", y: 1234 },
      { x: "snake", y: 2048 },
      { x: "crocodile", y: 2600 }, 
      { x: "alligator", y: 9000 },
    ]}/>
      </VictoryChart>
      <VictoryChart style={{ parent: { maxWidth: "25%" } }}>
        <VictoryLine data={[
      { reptile: 'lizard', awesomeness: 1234 },
      { reptile: 'snake', awesomeness: 2048 },
      { reptile: 'crocodile', awesomeness: 2600 },
      { reptile: 'alligator', awesomeness: 9000 },
    ]}
    x="reptile"
    y="awesomeness"/>
      </VictoryChart >
      <VictoryChart style={{ parent: { maxWidth: "25%" } }}>
      <VictoryPie colorScale={["#008f68", "#6DB65B", "#4AAE9B", "#EFBB35"]} data={[
    { x: "lizard", y: 1234 },
    { x: "snake", y: 2048 },
    { x: "crocodile", y: 2600 },
    { x: "alligator", y: 9000 },
  ]}/>
      </VictoryChart>
      <VictoryChart>
  <VictoryGroup offset={20}
    colorScale={"qualitative"}
  >
    <VictoryBar
      data={[{ x: 'Jan', y: 1 }, { x:'Feb', y: 2 }, { x: 'March', y: 5 }]}
    />
    <VictoryBar
      data={[{ x: 'Jan', y: 2 }, { x: 'Feb', y: 1 }, { x: 'March', y: 7 }]}
    />
    <VictoryBar
      data={[{ x: 'Jan', y: 3 }, { x: 'Feb', y: 4 }, { x: 'March', y: 9 }]}
    />
  </VictoryGroup>
  <VictoryLegend x={50} y={50}
  title="Type"
  titleOrientation="left"
  gutter={20}
  orientation="horizontal"
  style={{ border: { stroke: "black" }, title: { fontSize: 10 } }}
  data={[
    { name: "Closed" }, { name: "Open" }, { name: "In Process" }
  ]}
/>
</VictoryChart>
      
    </div>
    ); */
  }
}

const mapActionsToProps = {
}

const mapStateToProps = function (state) {
  return {
    departments: state.departments,
    priority: state.priority,
    ticketStatus: state.ticketStatus,
    ticketType: state.ticketType,
    serviceCategories: state.serviceCategories
  }
}

export default connect(mapStateToProps, mapActionsToProps)(DashBoardForm);