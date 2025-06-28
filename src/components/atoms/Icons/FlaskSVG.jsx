import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Flask';

export const FlaskSVG = ({
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
          data-testid="component-flask"
          className="icon--grey"
          transform="matrix(0.35468074,0,0,0.35468074,-306.96757,-254.44164)"
        >
          <path
            data-testid="path1191"
            className="svg__7"
            d="m 930.34665,719.97196 c -4.6791,0 -8.44587,1.46469 -8.44587,3.28432 0,1.8187 3.76301,3.28316 8.4387,3.28467 l -1.11494,43.84179 v 0 l -37.55641,87.51565 c 1.84005,5.3322 6.88724,9.14359 12.8602,9.14359 h 74.13703 c 5.98264,0 11.03586,-3.82369 12.86839,-9.16934 l -37.54501,-87.4899 v 0 l -1.12667,-43.86239 c 4.23723,-0.17933 7.51474,-1.56698 7.51474,-3.26407 0,-1.81963 -3.76688,-3.28432 -8.44598,-3.28432 z"
          />
          <path
            data-testid="path1193"
            d="m 914.34083,808.52682 54.83392,-0.7377 21.37547,50.36644 -7.35959,8.89359 -83.84924,-0.98359 -7.14645,-7.88466 z"
          />
          <circle data-testid="circle1195" className="svg__9" cx="945.83667" cy="798.41296" r="4.501822" />
          <circle data-testid="circle1197" className="svg__9" cx="941.77618" cy="773.34399" r="4.501822" />
          <circle data-testid="circle1199" className="svg__10" cx="936.65643" cy="787.64392" r="2.7018788" />
          <circle data-testid="circle1201" className="svg__11" cx="937.80396" cy="763.36945" r="1.8019073" />
          <circle
            data-testid="circle1203"
            className="svg__11"
            aria-label="circle1203"
            cx="944.04565"
            cy="745.39331"
            r="1.8019073"
          />
          <circle data-testid="circle1205" className="svg__11" cx="937.80396" cy="735.40656" r="1.8019073" />
        </g>
      </g>
    </SCSVGIcon>
  );
};
