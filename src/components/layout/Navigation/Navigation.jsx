import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  closeSidePanel,
  closeGlobalModal,
  hideLoadingModal,
  executeCommand
} from '../../../components/molecules/Global/globalActions';
import { dismissAlert } from '../../../components/layout/Alert/alertActions';
import { getFormattedDate } from '../../../utils/clock';
import {
  SCNavigation,
  SCWeek,
  SCNavigationContent,
  SCNavigationLinks,
  SCNavigationIcon,
  SCNavigationLabels
} from './styles';
import { navigationMap } from './data';

const SINGLE_DIGIT = 9;

const Navigation = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState(location.pathname);

  const renderNavItems = navigationMap.map((item) => {
    const isActive = currentUrl === item.url;
    const IconSVG = item.icon;
    const handleClick = () => {
      if (currentUrl !== item.url) {
        navigate(item.url);
        setCurrentUrl(item.url);
        dispatch(closeGlobalModal());
        dispatch(hideLoadingModal());
        dispatch(dismissAlert());
        dispatch(closeSidePanel());
      }
    };

    return (
      <SCNavigationLinks key={item.url} onClick={handleClick} isactive={isActive ? 'true' : undefined}>
        <SCNavigationIcon isactive={isActive ? 'true' : undefined}>
          <IconSVG ariaLabel={`${item.label} Page`} width="45" {...item.props} />
        </SCNavigationIcon>
        <SCNavigationLabels>{item.label}</SCNavigationLabels>
      </SCNavigationLinks>
    );
  });

  return (
    <SCNavigation>
      <SCNavigationContent>
        <SCWeek istwodigit={getFormattedDate().week > SINGLE_DIGIT ? 'true' : undefined}>
          {getFormattedDate().week}
        </SCWeek>
        {renderNavItems}
      </SCNavigationContent>
    </SCNavigation>
  );
});

export default Navigation;
