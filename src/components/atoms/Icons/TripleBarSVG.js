import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Triple Bar';

export const TripleBarSVG = ({
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
          data-testid="component-triple"
          className="svg__24"
          d="m 2.63845,6.700315 c -1.05196,-10e-6 -1.89909,0.84717 -1.89909,1.89926 v 5.42138 c 0,1.0521 0.84713,1.89905 1.89909,1.89905 h 48.72324 c 1.05201,0 1.89895,-0.84695 1.89895,-1.89905 v -5.42138 c 0,-1.05209 -0.84694,-1.89926 -1.89895,-1.89926 z m 0,15.68984 c -1.05196,0 -1.89909,0.84715 -1.89909,1.89927 v 5.42138 c 0,1.05211 0.84713,1.89903 1.89909,1.89903 h 48.72324 c 1.05201,0 1.89895,-0.84692 1.89895,-1.89903 v -5.42138 c 0,-1.05212 -0.84694,-1.89927 -1.89895,-1.89927 z m 0,15.69004 c -1.05196,0 -1.89909,0.84699 -1.89909,1.89909 v 5.42134 c 0,1.0521 0.84713,1.89906 1.89909,1.89906 h 48.72324 c 1.05201,0 1.89895,-0.84696 1.89895,-1.89906 v -5.42134 c 0,-1.0521 -0.84694,-1.89909 -1.89895,-1.89909 z"
        />
      </g>
    </SCSVGIcon>
  );
};
