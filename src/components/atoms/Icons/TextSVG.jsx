import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Text';

export const TextSVG = ({
  ariaLabel = defaultAriaLabel,
  width = defaultSize,
  height = defaultSize,
  viewBox = defaultViewBox,
  transform,
  text,
  onClick
}) => {
  return (
    <SCSVGIcon aria-label={ariaLabel} width={width} height={height} viewBox={viewBox} onClick={onClick}>
      <g transform={transform} className="icon--white">
        <text data-testid="component-text" className="svg__85" x="4.1267548" y="53.761513">
          <tspan data-testid="tspan15498" className="svg__85" x="4.1267548" y="53.761513">
            {text}
          </tspan>
        </text>
      </g>
    </SCSVGIcon>
  );
};
