import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const DIRECTION = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT'
};

const mapDirection = {
  LEFT: {
    translate: 'translate(60,0)',
    rotate: 'rotate(90)',
    defaultAriaLabel: 'arrow left'
  },
  DOWN: {
    translate: '',
    rotate: '',
    defaultAriaLabel: 'arrow left'
  },
  UP: {
    translate: 'translate(60,54)',
    rotate: 'rotate(180)',
    defaultAriaLabel: 'arrow up'
  },
  RIGHT: {
    translate: 'translate(0,54)',
    rotate: 'rotate(270)',
    defaultAriaLabel: 'arrow right'
  }
};

export const ArrowSVG = ({
  ariaLabel,
  width = defaultSize,
  height = defaultSize,
  viewBox = defaultViewBox,
  transform,
  conditions,
  onClick
}) => {
  const orientation = conditions.orientation || DIRECTION.UP;
  const { translate, rotate, defaultAriaLabel } = mapDirection[orientation];

  return (
    <SCSVGIcon aria-label={ariaLabel} width={width} height={height} viewBox={viewBox} onClick={onClick}>
      <g transform={transform}>
        <g transform={translate}>
          <path
            data-testid={`${DIRECTION[orientation]}-arrow-icon`}
            transform={rotate}
            d="m 26.989715,0.24153 c -2.33451,0 -4.21393,1.87945 -4.21393,4.21395 v 35.76128 l -9.76523,-9.46344 c -1.67642,-1.62457 -4.3339603,-1.58306 -5.9585503,0.0937 -1.6247,1.67642 -1.58306,4.334 0.0937,5.95869 L 22.578775,51.76177 c 0.49453,0.4791 1.07451,0.8122 1.68801,1.00223 0.73354,0.62051 1.6829,0.99451 2.72328,0.99451 1.03503,0 1.97987,-0.36991 2.71185,-0.98459 0.62519,-0.18828 1.21662,-0.52445 1.71958,-1.01185 l 15.43292,-14.9562 c 1.67655,-1.6247 1.71822,-4.28211 0.0939,-5.95854 -1.62468,-1.67653 -4.28225,-1.7182 -5.95869,-0.0939 l -9.78538,9.48297 V 4.45544 c 0,-2.3345 -1.87931,-4.21395 -4.2139,-4.21395 z"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
