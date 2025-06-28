import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Save';

export const SaveSVG = ({
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
        <g data-testid="component-save" transform="matrix(0.36320093,0,0,0.42856122,-307.73561,-323.61764)">
          <rect
            data-testid="rect27176"
            className="svg__31"
            width="130.21593"
            height="124.93198"
            x="856.51855"
            y="755.66132"
            rx="6.9766769"
            ry="6.9766769"
          />
          <rect
            data-testid="rect27299"
            className="svg__32"
            width="108.27839"
            height="52.584885"
            x="867.72717"
            y="824.27631"
            ry="7.8932104"
            rx="7.8932104"
          />
          <rect
            data-testid="rect27425"
            className="svg__32"
            width="86.418175"
            height="35.392899"
            x="878.09998"
            y="759.19098"
            ry="6.5776744"
            rx="6.5776744"
          />
          <rect
            data-testid="rect28230"
            className="svg__5"
            width="17.607813"
            height="29.844864"
            x="937.68628"
            y="761.79681"
            rx="0"
            ry="0"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
