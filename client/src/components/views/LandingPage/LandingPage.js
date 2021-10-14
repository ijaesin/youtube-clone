import React from 'react'
import { FaCode } from "react-icons/fa";
import { Typograph, Row, Col, Typography } from 'antd';

function LandingPage() {
  const Title = Typography;

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2} > Recommended </Title>
      <hr />

      <Row gutter={32, 16}>
          <Col lg={6} md={8} xs={24}>
            <div style={{position:'relative'}}>
              <div className="duration">

              </div>   
            </div>
          </Col>
      </Row>
    </div>
  )
}

export default LandingPage
