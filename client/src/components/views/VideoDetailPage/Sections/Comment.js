import Axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

function Comment(props) {
  const [CommentValue, setCommentValue] = useState('');
  const user = useSelector(state => state.user);
  const videoId = props.postId;

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);

  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variable = {
      content: CommentValue,
      writer: user.userData._id,
      postId: videoId
    }
    Axios.post('/api/comment/saveComment', variable)
      .then(res => {
        if (res.data.success) {
          setCommentValue('');
          props.refreshFunction(res.data.result);
        } else {
          alert('Failed to save Comment.');
        } 
      })
  }

  return (
    <div>
      <br />
      <p> Replies </p>
      <hr />
      {props.commentList && props.commentList.map((comment, index) => (
        (!comment.responseTo &&
          <React.Fragment key={index}>
            <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={videoId}/>
            <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} postId={videoId} commentList={props.commentList}/>
          </React.Fragment>
        )
      ))}

      <form style={{display:'flex'}} onSubmit={onSubmit}>
        <textarea 
          style={{ width:'100%', borderRadius:'5px'}}
          onChange={handleClick}
          value={CommentValue}
          placeholder="Please write Comments."
        />
        <br />
        <button style={{width:'20%', height:'52px'}} onClick={onSubmit} >Submit</button>
      </form>
    </div>
  )
}

export default Comment
