import React from 'react';
import { noop } from 'utils/noop';
import { SCSwitchBtnWrapper, SCSwitchBtn } from './styles';

const ZERO = 0;
const ONE = 1;

const Switch = React.memo(({ data, switchIndex, onToggleSwitch = noop }) => {
  const renderSwitchs = data.map((item, itemIndex) => {
    const isActive = switchIndex === itemIndex;
    const isFirst = itemIndex === ZERO;
    const isLast = itemIndex === data.length - ONE;
    const ariaLabel = isActive ? `${item.label} mode is on` : `${item.label} mode is off`;

    return (
      <SCSwitchBtn
        isFirst={isFirst}
        isLast={isLast}
        isActive={isActive}
        key={item.label}
        aria-label={ariaLabel}
        onClick={() => {
          onToggleSwitch(itemIndex);
        }}
      >
        {item.label}
      </SCSwitchBtn>
    );
  });

  return <SCSwitchBtnWrapper>{renderSwitchs}</SCSwitchBtnWrapper>;
});

export default Switch;
