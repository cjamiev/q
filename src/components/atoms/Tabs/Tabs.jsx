import React, { useState } from 'react';
import { noop } from '../../../utils/noop';
import { SCTabButtonGroup, SCTabButton } from './styles';

const ZERO = 0;

const Tabs = ({ data, onTabSwitch = noop, isLightMode = false }) => {
  const [tabIndex, setTabIndex] = useState(ZERO);
  const TabComponent = data[tabIndex].component;

  const renderTabs = data.map((tItem, tIndex) => {
    return (
      <SCTabButton
        islightmode={isLightMode ? 'true' : undefined}
        key={tItem.title}
        isactive={tabIndex === tIndex ? 'true' : undefined}
        onClick={() => {
          setTabIndex(tIndex);
          onTabSwitch();
        }}
      >
        {tItem.title}
      </SCTabButton>
    );
  });

  return (
    <>
      <SCTabButtonGroup islightmode={isLightMode ? 'true' : undefined}>{renderTabs}</SCTabButtonGroup>
      {<TabComponent />}
    </>
  );
};

export default Tabs;
