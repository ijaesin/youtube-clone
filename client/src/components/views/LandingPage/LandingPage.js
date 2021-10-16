import React, { useState, useEffect} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Row, Col, Typography, Avatar } from 'antd';
import Axios from 'axios';
import moment from 'moment';


const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [Video, setVideo] = useState([]);

  useEffect(() => {
    Axios.get('/api/video/getVideos')
      .then(response => {
        if (response.data.success) {
          setVideo(response.data.videos)
        } else {
          alert('Failed to get Videos')
        }
      })
  }, [])

  const renderCards = Video.map((video, index) => {
    const minutes = Math.floor(video.duration / 60);
    const seconds = Math.floor(video.duration - (minutes * 60));

    return  <Col key={index} lg={6} md={8} xs={24}>
        <div style={{position:'relative`'}}>
          <a href={`/video/${video._id}`}>
            <img style={{ width:'100%'}} src={`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
            <div className="duration">
              <span>{minutes} : {seconds}</span>
            </div>   
          </a>
        </div>
        <br />
        <Meta
          avatar={
            <Avatar src={video.writer.image} />
          }
          title={video.title}
          description=""
        />
        <span>{video.writer.name}</span><br />
        <span style={{marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM do YY")}</span>
      </Col>
  })

  return (
    <div style={{ width: '85%', margin: '3rem auto' }}>
      <Title level={2} > Recommended </Title>
      <hr />
      <Row gutter={32, 16}>
          {renderCards}
          
      </Row>
    </div>
  )
}

export default LandingPage
