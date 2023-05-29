import React from 'react';
import {BiNotification,BiMessage} from 'react-icons/bi'
const Navbar = () => {
    return (
        <div className='flex row '>
            <div className='col columns-3xl'>
                <input type='text' placeholder='Search' className='border-2 border-gray-300 rounded-lg p-2' />
            </div>
            <div>
                <button className='bg-blue-500 text-white rounded-lg p-2'>Search</button>
            </div>
            <div className='text-orange flex  mt-2  text-3xl'>
            <div className=''><BiNotification/></div>
            <div><BiMessage/></div>
            </div>
          
           
            
        </div>
    );
}

export default Navbar;
