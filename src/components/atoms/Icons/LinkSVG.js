import React from 'react';
import { defaultSize, defaultViewBox } from './data';
import { SCSVGIcon } from './styles';

const defaultAriaLabel = 'Link';

export const LinkSVG = ({
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
          data-testid="component-link"
          className="icon--white"
          transform="matrix(1.1783876,0,0,1.1783876,-3.0217941,-4.3519843)"
        >
          <path
            data-testid="path2768"
            className="svg__17"
            d="m 38.004393,12.286832 c 0.01231,1.159163 -0.504951,2.308039 -1.501211,3.068798 l -14.918836,11.392027 14.91815,11.391578 c 1.677895,1.281238 1.99719,3.663467 0.715922,5.341374 -1.281259,1.677929 -3.66348,1.997294 -5.34137,0.716055 L 13.199886,29.934709 c -1.032865,-0.788715 -1.550009,-1.994693 -1.49684,-3.196696 -0.04702,-1.195781 0.470017,-2.393251 1.497529,-3.177875 L 31.877616,9.298202 c 1.677907,-1.281261 4.060231,-0.961983 5.341496,0.715924 0.520515,0.681658 0.776861,1.479616 0.785281,2.272706 z"
          />
          <circle data-testid="path1431" className="svg__57" cx="13.733319" cy="26.078873" r="6.5684338" />
          <circle data-testid="circle1433" className="svg__57" cx="37.220703" cy="10.881055" r="6.5684338" />
          <circle data-testid="circle1435" className="svg__57" cx="37.220703" cy="42.330612" r="6.5684338" />
        </g>
      </g>
    </SCSVGIcon>
  );
};
