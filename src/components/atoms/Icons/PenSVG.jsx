import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Pen';

export const PenSVG = ({
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
        <g data-testid="component-pen" transform="matrix(1.354135,0,0,1.354135,-21.893213,6.5195347)">
          <path
            data-testid="path862"
            className="svg__13"
            d="M 40.739671,0.61431653 46.025244,4.2272404 28.928512,30.668964 23.710772,27.334153 Z"
          />
          <rect
            data-testid="rect19723"
            className="svg__14"
            width="5.3989525"
            height="3.3155391"
            x="34.260525"
            y="-28.061357"
            rx="0"
            ry="0"
            transform="rotate(34.676751)"
          />
          <path
            data-testid="path20106"
            className="svg__15"
            transform="matrix(0.05039737,0.05168024,-0.05168024,0.05039737,-97.641559,-101.68475)"
            d="m 2514.4018,116.13127 -44.6177,-47.754243 63.6652,-14.762953 z"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
