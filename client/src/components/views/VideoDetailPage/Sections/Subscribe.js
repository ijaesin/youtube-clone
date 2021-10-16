import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom
    }

    Axios.post('/api/subscribe/subscribeNumber', subscribedVariable)
      .then(res => {
        if (res.data.success) {
          setSubscribeNumber(res.data.subscribeNumber);
        } else {
          alert('Failed to get Subscribe Number');
        }
      })

    Axios.post('/api/subscribe/subscribed', subscribedVariable)
      .then(res => {
        if (res.data.success) {
          setSubscribed(res.data.subscribed);
        } else {
          alert('Failed to get ...');
        }
      })
  }, [])

  const onSubscribe = () => {
    const subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom
    }
    if (Subscribed) {
      Axios.post('/api/subscribe/unSubscribe', subscribedVariable)
        .then(res => {
          if (res.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert('Failed to Unsubcribe.');
          }
        })
    } else {
      Axios.post('/api/subscribe/subscribe', subscribedVariable)
        .then(res => {
          if (res.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert('Failed to Subcribe.');
          }
        })
    }
  }

  return (
    <div>
      <button
        style={{backgroundColor:`${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius:'4px', color:'white', padding:'10px 16px', fontWeight:'500', fontSize:'1rem', textTransform:'uppercase'}}
        onClick={onSubscribe}
      >
        {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
      </button>
    </div>
  )
}

export default Subscribe
