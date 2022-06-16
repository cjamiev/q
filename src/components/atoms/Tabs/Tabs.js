import React, { useState } from 'react';
import { noop } from 'utils/noop';
import { SCTabButtonGroup, SCTabButton } from './styles';

const ZERO = 0;

const Tabs = ({ data, onTabSwitch = noop, isLightMode = false }) => {
  const [tabIndex, setTabIndex] = useState(ZERO);
  const TabComponent = data[tabIndex].component;

  const renderTabs = data.map((tItem, tIndex) => {
    return (
      <SCTabButton
        isLightMode={isLightMode}
        key={tItem.title}
        isActive={tabIndex === tIndex}
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
      <SCTabButtonGroup isLightMode={isLightMode}>{renderTabs}</SCTabButtonGroup>
      {<TabComponent />}
    </>
  );
};

export default Tabs;
