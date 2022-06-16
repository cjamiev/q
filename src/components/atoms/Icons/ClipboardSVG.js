import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Clipboard';

export const ClipboardSVG = ({
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
          data-testid="component-clipboard"
          className="icon--hollow"
          transform="matrix(0.28977699,0,0,0.28625863,-205.76251,-277.34106)"
        >
          <rect
            data-testid="rect1209"
            className="svg__60"
            width="128.36333"
            height="162.10175"
            x="739.06537"
            y="991.74249"
            rx="10.15739"
            ry="8.7020054"
          />
          <rect
            data-testid="rect2923"
            className="svg__61"
            width="82.739342"
            height="35.608315"
            x="762.97418"
            y="971.94647"
            ry="9.8475342"
            rx="10.457565"
          />
        </g>
      </g>
    </SCSVGIcon>
  );
};
