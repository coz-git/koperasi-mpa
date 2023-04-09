import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../assets/loading/78969-money.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingAnimation.default,
  renderSettings: {
    preserveAspectRatio: 'xMidYMid slice',
  },
};

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-fixed bg-cover bg-no-repeat bg-center">
      <Lottie animationData={loadingAnimation} className="w-72" />
      <p className="text-lg">Please wait..</p>
    </div>
  );
};

export default Loading;
