import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'File';

export const FileSVG = ({
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
          data-testid="component-file"
          className="icon--hollow"
          transform="matrix(0.65070823,0,0,0.65070823,-32.919111,-35.092846)"
        >
          <path
            data-testid="path945"
            className="svg__12"
            d="m 70.497671,55.890345 c -4.39737,0 -7.9375,3.540125 -7.9375,7.9375 v 63.319135 c 0,4.39738 3.54013,7.9375 7.9375,7.9375 h 43.170489 c 4.39737,0 7.9375,-3.54012 7.9375,-7.9375 V 78.214563 L 97.175111,55.890345 Z"
          />
          <path
            data-testid="rect931"
            className="svg__12"
            d="m 97.704112,55.762488 v 13.98416 c 0,4.397375 3.540118,7.9375 7.937498,7.9375 h 15.91686 v -0.52555 L 98.143363,55.762488 Z"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
