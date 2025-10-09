import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../constants/routes';
import './navigation.css';
const routeList = Object.keys(ROUTES);

const Navigation = React.memo(() => {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  const renderNavItems = routeList.map((route) => {
    const isLinkActive = currentUrl === ROUTES[route].url;
    const handleClick = () => {
      if (currentUrl !== ROUTES[route].url) {
        navigate(ROUTES[route].url);
        setCurrentUrl(ROUTES[route].url);
      }
    };

    return (
      <div key={ROUTES[route].url} className={isLinkActive ? 'navigation-link__active navigation-link' : 'navigation-link'} onClick={handleClick}>
        <div className='navigation-label'>{ROUTES[route].label}</div>
      </div>
    );
  });

  return (
    <div className={`navigation-container ${isActive ? 'navigation-container__active' : ''}`} onMouseEnter={() => setIsActive(true)} onMouseLeave={() => setIsActive(false)}>
      {isActive ? <nav className='navigation'>
        {renderNavItems}
      </nav> : <svg height="50" width="50">
        <line x1="10" y1="15" x2="40" y2="15" style={{ stroke: 'white', strokeWidth: 2 }} />
        <line x1="10" y1="25" x2="40" y2="25" style={{ stroke: 'white', strokeWidth: 2 }} />
        <line x1="10" y1="35" x2="40" y2="35" style={{ stroke: 'white', strokeWidth: 2 }} />
      </svg>}
    </div>
  );
});

export default Navigation;
