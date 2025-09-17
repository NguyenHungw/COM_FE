import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic } from 'antd';
import CountUp from 'react-countup';
const formatter = value => <CountUp end={value} separator="." />;
const StatisticChart = () => (
  <Row gutter={16}>
    <Col span={6} xs={24} sm={24} md={12} lg={12} xl={6}>
      <Card variant="borderless">
        <Statistic
          title = "Today sale"
          value={5000000}
          precision={0}
          valueStyle={{ color: '#3f8600' ,fontSize:30 ,fontWeight:'bold'}}
          // prefix={<ArrowUpOutlined />}
          suffix="VNĐ"
          // formatter={formatter}
        />

         <Statistic
          value={100.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
          formatter={formatter}
        />
      </Card>
      
       
   
    </Col>
    <Col span={6} xs={24} sm={24} md={12} lg={12} xl={6}>
      <Card variant="borderless">
        <Statistic
          title="Today's User"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
     <Col span={6} xs={24} sm={24} md={12} lg={12} xl={6}>
      <Card variant="borderless">
        <Statistic
          title="New Clients"
          value={11.28}
          precision={2}
          valueStyle={{ color: '#3f8600' }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
    <Col span={6} xs={24} sm={24} md={12} lg={12} xl={6}>
      <Card variant="borderless">
        <Statistic
          title="New Orders"
          value={9.3}
          precision={2}
          valueStyle={{ color: '#cf1322' }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Col>
  </Row>
);
export default StatisticChart;