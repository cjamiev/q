import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Directory';

export const DirectorySVG = ({
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
          data-testid="component-directory"
          className="icon--white"
          transform="matrix(1.1455647,0,0,1.1455647,-4.9077766,-6.5098537)"
        >
          <path
            data-testid="path863"
            className="svg__18"
            d="m 41.567376,46.285202 v 0 c 0,0 -0.354165,3.332635 -3.895859,3.456061 -3.54169,0.123432 -14.403656,0.24691 -14.403656,0.24691 0,0 -10.270811,-0.123431 -13.8124724,-0.246862 -3.5416581,-0.123429 -3.8958248,-3.456064 -3.8958248,-3.456064 0,0 -0.3541657,-29.376531 -0.3541657,-33.573179 0,-4.1966472 2.4791615,-4.1966472 2.4791615,-4.1966472 l 8.7360944,0.1234308 6.847207,7.5864614 c 0,0 10.861966,0.123479 14.403656,0.246911 3.541694,0.123426 3.077706,2.637905 3.077706,2.637905"
          />
          <path
            data-testid="path905"
            className="svg__19"
            d="M 5.6627865,46.285202 14.583021,25.303451 c 0,0 1.159429,-2.504332 3.830716,-2.253899 h 28.892464"
          />
          <path
            data-testid="path909"
            className="svg__19"
            d="M 41.451672,46.73149 50.487613,25.303451 C 50.691569,24.312806 48.33293,22.940328 46.981549,23.049552"
          />
          <path
            data-testid="path919"
            className="svg__20"
            aria-label="path919"
            d="m 40.749222,18.580962 0.210138,4.196044"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
