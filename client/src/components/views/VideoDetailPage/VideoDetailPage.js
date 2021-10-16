import React, {useState, useEffect} from 'react'
import { List, Avatar, Row, Col } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';


function VideoDetailPage(props) {
  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    const videoId = props.match.params.videoId;
    const variable = { videoId: videoId }
    
    Axios.post('/api/video/getVideoDetail', variable)
      .then(res => {
        if (res.data.success) {
          setVideoDetail(res.data.videoDetail);
        } else {
          alert('Failed to get video detail.')
        }
      })
  }, [])

  if(VideoDetail.writer) {    
    return (
      <div>
        <Row gutter={[16, 16]}>
          <Col lg={18} xs={24}>
            <div style={{width:'100%', padding:'3rem 4rem'}}>
              <video style={{width:'100%'}} src={`http://localhost:5000/${VideoDetail.filePath}`} controls></video>
              <List.Item
                actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')}/>]}
              >
                <List.Item.Meta 
                  avatar={<Avatar src={VideoDetail.writer.image} />}
                  title={VideoDetail.writer.name}
                  description={VideoDetail.description}
                />
              </List.Item>
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
      </div>
    )
  } else {
    return (
      <div>loading...</div>
    )
  }

}

export default VideoDetailPage
