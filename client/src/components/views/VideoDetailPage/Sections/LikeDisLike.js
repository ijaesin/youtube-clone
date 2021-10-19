import React, {useEffect, useState} from 'react'
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';

function LikeDisLike(props) {
  const [Likes, setLikes] = useState(0);
  const [DisLikes, setDisLikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DisLikeAction, setDisLikeAction] = useState(null);

  let variable = {}
  if (props.video) {
    variable = {
      videoId: props.videoId,
      userId: props.userId
    }
  } else {
    variable = {
      commentId: props.commentId,
      userId: props.userId
    }
  }

  useEffect(() => {
    Axios.post('/api/like/getLikes', variable)
      .then(res => {
        if (res.data.success) {
          setLikes(res.data.likes.length);
          res.data.likes.map(like => {
            if (like.userId === props.userId) {
              setLikeAction('liked');
            }
          })
        } else {
          alert('Failed to get Likes');
        }
      })

    Axios.post('/api/like/getDisLikes', variable)
      .then(response => {
        if (response.data.success) {
          setDisLikes(response.data.dislikes.length)
          response.data.dislikes.map(dislike => {
            if (dislike.userId === props.userId) {
              setDisLikeAction('disliked')
            }
          })
        } else {
          alert('Failed to get dislikes')
        }
      })
  }, [])


  const onLike = () => {
    if (LikeAction === null) {
      Axios.post('/api/like/upLike', variable)
        .then(res => {
          if (res.data.success) {
            setLikes(Likes + 1);
            setLikeAction('liked');
            if (DisLikeAction !== null) {
              setDisLikeAction(null);
              setDisLikes(DisLikes - 1);
            }
          } else {  
            alert('Failed to up Like.');
          }
        })
    } else {
      Axios.post('/api/like/downLike', variable)
        .then(res => {
          if (res.data.success) {
            setLikes(Likes - 1);
            setLikeAction(null);
          } else {  
            alert('Failed to down Like.');
          }
        })
    }
  } 

  const onDisLike = () => {
  if (DisLikeAction !== null) {
    Axios.post('/api/like/downDisLike', variable)
      .then(response => {
        if (response.data.success) {
          setDisLikes(DisLikes - 1)
          setDisLikeAction(null)
        } else {
          alert('Failed to decrease dislike')
        }
      })
  } else {
    Axios.post('/api/like/upDisLike', variable)
      .then(response => {
        if (response.data.success) {
          setDisLikes(DisLikes + 1)
          setDisLikeAction('disliked')
          if(LikeAction !== null ) {
            setLikeAction(null)
            setLikes(Likes - 1)
          }
        } else {
          alert('Failed to increase dislike')
        }
      })
    }
  }

  return (
      <React.Fragment>
        <span key="comment-basic-like">
          <Tooltip title="Like">
            <Icon 
              type="like"
              theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
              onClick={onLike}
            />
          </Tooltip>
          <span style={{ paddingLeft:'8px', cursor:'auto' }}> {Likes} </span>
        </span>

        <span key="comment-basic-dislike">
          <Tooltip title="DisLike">
            <Icon 
              type="dislike"
              theme={DisLikeAction === 'disliked' ? 'filled' : 'outlined'}
              onClick={onDisLike}
            />
          </Tooltip>
          <span style={{ paddingLeft:'8px', cursor:'auto' }}> {DisLikes} </span>
        </span>
      </React.Fragment>
  )
}

export default LikeDisLike