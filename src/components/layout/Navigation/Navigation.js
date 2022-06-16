import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  closeSidePanel,
  closeGlobalModal,
  hideLoadingModal,
  executeCommand
} from 'components/molecules/Global/globalActions';
import { dismissAlert } from 'components/layout/Alert/alertActions';
import { getFormattedDate } from 'utils/clock';
import {
  SCNavigation,
  SCWeek,
  SCNavigationContent,
  SCNavigationLinks,
  SCNavigationBottomLinks,
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
      <SCNavigationLinks key={item.url} onClick={handleClick} isActive={isActive} isAtBottom={item.isAtBottom}>
        <SCNavigationIcon isActive={isActive}>
          <IconSVG ariaLabel={`${item.label} Page`} width="45" {...item.props} />
        </SCNavigationIcon>
        <SCNavigationLabels>{item.label}</SCNavigationLabels>
      </SCNavigationLinks>
    );
  });

  return (
    <SCNavigation>
      <SCNavigationContent>
        <SCWeek isTwoDigit={getFormattedDate().week > SINGLE_DIGIT}>{getFormattedDate().week}</SCWeek>
        {renderNavItems}
      </SCNavigationContent>
    </SCNavigation>
  );
});

export default Navigation;
