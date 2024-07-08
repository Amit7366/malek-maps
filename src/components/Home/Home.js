import React, { useEffect, useState } from 'react';
import Form from '../Form/Form';

const Home = () => {
    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        setTimeout(()=>{
            setShowPopup(true);
        },3000) // Set showPopup to true after the component mounts
      }, []);
      const handleClosePopup = () => {
        setShowPopup(true);
      };
    return (
        <div className='w-screen h-screen relative z-10' onClick={handleClosePopup}>
            <iframe className='absolute top-0 left-0 h-full'  title='map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1339967.9624639747!2d-100.97180559921846!3d34.26459709743478!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1686250989510!5m2!1sen!2sbd" width={'100%'} height={'100%'}  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
           

            <div className='absolute top-0 left-0 w-full h-full z-20 bg-white/40  backdrop-blur-sm'>
                {showPopup && <Form></Form>}
            
            </div>
        </div>
    );
};

export default Home;