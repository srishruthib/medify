import React from 'react';
import './Navbar.css';
import Logo from '../../assets/logo.svg';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

function Navbar(){
    const navigate = useNavigate();

    return (
        <div className='navBar'>
            
                <div className='logo'  onClick={() => navigate('/')}>
                    <img src={Logo}/>
                    <p> Medify</p>
                </div>
                <div className='options'>
                
                    
                        <p>Find Doctors</p>


                        <p onClick={() => navigate('/SearchResult')}>Hospitals</p>

        
                        <p>Medicines</p>
                    
                    
                        <p>Surguries</p>
                    
                    
                        <p>Software for Provider</p>
                    
                    
                        <p>Facilities</p>

 
                       <h1><Button id='bookings' onClick={() => navigate('/my-bookings')}>My Bookings</Button></h1>

                </div>
          
           
        </div>
    )
}

export default Navbar;