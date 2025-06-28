import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Copy and Paste';

export const CopySVG = ({
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
        <g
          data-testid="component-copy"
          className="icon--hollow"
          transform="matrix(1.220168,0,0,1.220168,-5.2290439,-7.0063971)"
        >
          <path
            data-testid="rect851"
            className="svg__56"
            d="m 16.045805,40.217695 h -3.055228 c -1.813834,0 -3.2742123,-1.751365 -3.2742123,-3.926759 v -25.54469 c 0,-2.1753954 1.4603783,-3.9267602 3.2742123,-3.9267599 h 17.804637 c 1.813836,0 3.274214,1.7513645 3.274214,3.9267599 v 1.950576"
          />
          <rect
            data-testid="rect1229"
            className="svg__56"
            width="24.353031"
            height="33.398445"
            x="18.757828"
            y="15.522585"
            rx="3.1406815"
            ry="3.2303054"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
