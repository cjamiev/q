import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Play';

export const PlaySVG = ({
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
        <path
          data-testid="component-play"
          className="svg__37 icon--hollow"
          d="M 39.665417,26.921939 14.119667,1.4515092 V 52.543259 Z"
        />
      </g>
    </SCSVGIcon>
  );
};
