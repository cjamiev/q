import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Minus';

export const MinusSVG = ({
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
        <g data-testid="component-minus" transform="matrix(1.0170865,0,0,1.0170865,0.08958619,0.08958619)">
          <rect
            data-testid="rect1103"
            className="svg__36"
            width="51.328522"
            height="15.165249"
            x="0.79407263"
            y="18.87571"
            ry="4.4712605"
            rx="4.4712605"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
