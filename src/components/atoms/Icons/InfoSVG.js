import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Info';

export const InfoSVG = ({
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
        <g data-testid="component-info" transform="matrix(1.0287964,0,0,1.0287964,-0.15212823,-0.28834925)">
          <ellipse
            data-testid="path841"
            className="svg__48 icon--black"
            cx="26.39213"
            cy="26.524538"
            rx="24.556198"
            ry="24.88722"
          />
          <g data-testid="g1420" transform="matrix(0.650662,0,0,0.650662,9.1766983,9.1646085)">
            <rect
              data-testid="rect1410"
              className="svg__49"
              width="10.406781"
              height="34.505215"
              x="21.254942"
              y="21.519564"
              rx="68.291397"
              ry="3.3764453"
            />
            <ellipse
              data-testid="path1412"
              className="svg__50"
              cx="27.090502"
              cy="7.2526193"
              rx="5.0865254"
              ry="5.0865278"
            />
          </g>
        </g>
      </g>
    </SCSVGIcon>
  );
};
