import React from 'react';
import { CloseSVG } from 'components/atoms/Icons/CloseSVG';
import { SCSidepanel, SCSidepanelHeader, SCSidepanelTitle, SCSidepanelBtn } from './styles';

const SidePanel = ({ isTransitioningOut, sidePanelContent, isSidePanelWide, toggleSidePanel, title }) => {
  const sidePanelHeaderClassName = isSidePanelWide ? 'sidepanel__header--full' : 'sidepanel__header';

  return (
    <SCSidepanel isFullSize={isSidePanelWide} isTransitioningOut={isTransitioningOut}>
      {title && (
        <SCSidepanelHeader isFullSize={isSidePanelWide}>
          <SCSidepanelTitle>{title}</SCSidepanelTitle>
          {isSidePanelWide && (
            <SCSidepanelBtn>
              <CloseSVG isBlack ariaLabel="Close Sidepanel" width="27" height="27" onClick={toggleSidePanel} />
            </SCSidepanelBtn>
          )}
        </SCSidepanelHeader>
      )}
      {sidePanelContent}
    </SCSidepanel>
  );
};

export default SidePanel;
