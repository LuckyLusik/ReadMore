import React, { useState, useEffect } from 'react';
import Img from 'react-image';
import badImage from '../images/noimage.png';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function ImageBook({ bookImage }) {
  const [orientation, setOrientation] = useState('v');

  useEffect(() => {
    function getMeta(url) {
      return new Promise((resolve, reject) => {
          let img = new Image();
          img.onload = () => resolve(img);
          img.onerror = reject;
          img.src = url;
      });
  };
    async function run() {
      let img = await getMeta(`${bookImage}`);
      let w = img.width;
      let h = img.height; 
      if( (w / h) > 0.68 ) {
        setOrientation('h');
      }
    };
    run();
  }, [bookImage]);

  


  return (
    <div className='image-style'>
      {
        orientation === 'v' ? 
        <Img src={[bookImage, badImage]} alt="Book Cover" loader={<CircularProgress style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}/>}
          style={{ width: 190, height: "auto"}} /> :
        <Img src={[bookImage, badImage]} alt="Book Cover" style={{ width: "auto", height: 280}} />
      }
      
    </div>
  )
}
