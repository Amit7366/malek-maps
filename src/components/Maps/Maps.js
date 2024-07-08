import React from 'react';

const Maps = () => {
    return (
        <div className='w-screen h-screen relative z-10'>
            <iframe className='absolute top-0 left-0 h-full' title='map' src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d193595.2528002468!2d-74.1444870506823!3d40.69763123326819!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1686024366052!5m2!1sen!2sbd" width={'100%'} height={'100%'}  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className='absolute top-0 left-0 w-full h-full z-20 bg-black/50'>
            </div>
        </div>
    );
};

export default Maps;