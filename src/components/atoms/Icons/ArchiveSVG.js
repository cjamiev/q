import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Archive';

export const ArchiveSVG = ({
  ariaLabel = defaultAriaLabel,
  width = defaultSize,
  height = defaultSize,
  viewBox = defaultViewBox,
  transform,
  onClick
}) => {
  return (
    <SCSVGIcon aria-label={ariaLabel} width={width} height={height} viewBox={viewBox} onClick={onClick}>
      <g transform={transform}>
        <g data-testid="component-archive">
          <rect
            data-testid="rect5694"
            className="svg__93"
            width="51.886677"
            height="9.201046"
            x="1.0566581"
            y="5.1592603"
            ry="1.195973"
            rx="1.195973"
          />
          <path
            data-testid="path7063"
            className="svg__94"
            d="m 3.59937,14.97933 -0.10553,26.7337 6.61994,7.15088 34.28146,-0.088 6.2493,-7.06465 0.16139,-26.5235 z"
          />
          <rect
            data-testid="rect7788"
            className="svg__31"
            width="29.523479"
            height="2.5797234"
            x="12.238161"
            y="21.216389"
            ry="0.89697963"
            rx="0.89697963"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
