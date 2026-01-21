import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppLogoImg from "../../assets/logo.png";
import './Header.scss';

const Header = () => {
  const location = useLocation();
  console.log(location);
  return (
    <header className="header_container">
      <div className="header_content">
        <div className="logo">
          <Link to={location.pathname === "/" ?"#":"/home"} className="logo_link">
            <img src={AppLogoImg} alt={"app logo"}/>
          </Link>
        </div>
        {location.pathname === "/" && <div className='signin_prompt'>
            <div className="signin_text">
            Already have an account? <Link to="#" className="signin_link">Sign in</Link>
            </div> 
        </div>}
        
      </div>
    </header>
  );
};

export default Header;
