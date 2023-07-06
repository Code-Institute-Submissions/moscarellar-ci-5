import React from 'react'
import Lottie from 'lottie-react'
import loading from '../assets/animations/Loading.json'

const Loading = () => {
  return <div style={{ width: '50px' }}><Lottie animationData={loading} /></div>
}

export default Loading