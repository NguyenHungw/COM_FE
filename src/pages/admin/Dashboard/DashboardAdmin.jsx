import { Card, Col, Row } from "antd"
import EChart from "../../../components/chart/EChart"
import LineChart from "../../../components/chart/LineChart"
import StatisticChart from "../../../components/chart/StatisticChart"
import './dashboardadmin.scss'
const DashboardAdmin = () => {
return(
    <>
  
    <StatisticChart/>
  

   <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={16} lg={16} xl={14} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <EChart />
            </Card>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              {/* <LineChart /> */}
              <div className="popular-product-container">
                <div className="most-popular-product">
                <h1>Most popular product</h1>
              </div>
              </div>
            </Card>
          </Col>
        </Row>
    </>
)
}

export default DashboardAdmin