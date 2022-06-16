import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Home';

export const HomeSVG = ({
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
          data-testid="component-home"
          className="icon--white"
          transform="matrix(0.35180651,0,0,0.35180651,-8.7810129,-12.859645)"
        >
          <g data-testid="g3343" transform="translate(-0.6494285)">
            <g data-testid="g3337">
              <path data-testid="path3278" className="svg__0" d="M 28.72619,111.125 103.94345,62.744048" />
              <path data-testid="path3280" className="svg__0" d="M 175.98569,111.125 100.76843,62.744048" />
            </g>
            <path
              data-testid="rect3282"
              className="svg__1"
              d="m 144.7369,49.789281 c -3.14098,0 -5.66994,0.505589 -5.66994,1.133782 V 81.015797 L 156.28348,92.08954 V 50.923063 c 0,-0.628193 -2.52844,-1.133782 -5.66942,-1.133782 z"
            />
          </g>
          <g data-testid="g3347">
            <path
              data-testid="rect3303"
              className="svg__2"
              d="m 41.759264,117.04765 c -0.16575,0.6266 -0.254821,1.28504 -0.254821,1.9652 v 51.2043 c 0,4.2188 3.396343,7.61514 7.615121,7.61514 h 40.438972 v -29.80158 c 0,-2.61166 2.102712,-4.71441 4.71434,-4.71441 h 14.867384 c 2.61159,0 4.71431,2.10275 4.71431,4.71441 v 29.80158 h 40.43885 c 4.21893,0 7.61516,-3.39634 7.61516,-7.61514 v -51.2043 c 0,-0.67705 -0.0891,-1.33271 -0.25272,-1.95682 H 42.097391 c -0.11334,0 -0.225984,-0.003 -0.338127,-0.007 z"
            />
            <path
              data-testid="path3333"
              className="svg__3"
              d="m 47.572097,117.69428 c 3.855501,-2.66937 52.27447,-31.95401 52.816433,-31.944289 0.59892,0.01048 54.84393,31.221339 56.02234,32.233199 0.26141,0.22455 -21.79126,0.37094 -54.66156,0.36306 -49.637003,-0.0131 -55.008306,-0.0766 -54.177213,-0.65197 z"
            />
          </g>
        </g>
      </g>
    </SCSVGIcon>
  );
};
