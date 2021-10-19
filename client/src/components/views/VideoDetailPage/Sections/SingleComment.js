import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import Axios from 'axios'; 
import { useSelector } from 'react-redux';
import LikeDisLike from './LikeDisLike';

const { TestArea } = Input;

function SingleComment(props) {
  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');
  const user = useSelector(state => state.user);

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply)
  }

  const actions = [
    <LikeDisLike userId={localStorage.getItem('userId')} commentId={props.comment._id}/>,
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to </span>
  ]

  const onHandleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
      responseTo: props.comment._id
    }
    Axios.post('/api/comment/saveComment', variable)
      .then(res => {
        if (res.data.success) {
          setCommentValue('');
          setOpenReply(!OpenReply);
          props.refreshFunction(res.data.result);
        } else {
          alert('Failed to save Comment.');
        } 
      })
  }

  return (
    <div>
      {/* {props.comment.writer &&  */}
        <Comment 
          actions={actions}
          author={props.comment.writer.name}
          avatar={<Avatar arc={props.comment.writer.image} alt="image" />}
          content={ <p>{props.comment.content}</p> }
        />
      {/* } */}

      {OpenReply && 
        <form style={{display:'flex'}} onSubmit={onSubmit}>
        <textarea
          style={{ width:'100%', borderRadius:'5px'}}
          onChange={onHandleChange}
          value={CommentValue}
          placeholder="Please write Comments."
        />
        <br />
        <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
      </form>
    }
  </div>
  )
}

export default SingleComment
