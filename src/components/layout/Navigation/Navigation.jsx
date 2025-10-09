import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { navigationMap } from './data';
import './navigation.css';

const Navigation = React.memo(() => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  const renderNavItems = navigationMap.map((item) => {
    const isLinkActive = currentUrl === item.url;
    const handleClick = () => {
      if (currentUrl !== item.url) {
        navigate(item.url);
        setCurrentUrl(item.url);
      }
    };

    return (
      <div key={item.url} className={isLinkActive ? 'navigation-link__active navigation-link' : 'navigation-link'} onClick={handleClick}>
        <div className='navigation-label'>{item.label}</div>
      </div>
    );
  });

  return (
    <div className={`navigation-container ${isActive ? 'navigation-container__active' : ''}`} onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
      {isActive && <nav className='navigation'>
        {renderNavItems}
      </nav>}
    </div>
  );
});

export default Navigation;
