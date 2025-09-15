/* eslint-disable no-magic-numbers */
import React, { useState } from 'react';
import { SCWrapper, SCContents } from './styles';
import useLocalStorage from '../../../hooks/useLocalStorage';
import { useCountdown } from '../../../hooks/useDisplayCountdown';
// import {
//   LS_NOTES_KEY,
//   LS_TIMERS_KEY,
//   LS_FILES_KEY,
//   LS_CLIPBOARD_KEY,
//   LS_SNIPPETS_KEY
// } from '../../../constants/localstorage';
import * as LS_KEYS from '../../../constants/localstorage';

const getCountdownDate = (endDateValue, selectedTime) => {
  const selecteDate = new Date(endDateValue);
  const [hours, minutes] = selectedTime.split(':');
  selecteDate.setUTCHours(hours, minutes, 0, 0)
  const time = selecteDate.getTime() + selecteDate.getTimezoneOffset() * 1000 * 60;

  return new Date(time);
}

const Countdown = ({ description, endDate }) => {
  const timeLeft = useCountdown({ endDate });

  return <div>{description + ': ' + timeLeft}</div>;
}

// SVG Cheat Sheet
/*
attributes: fill/stroke, opacity, 
  stroke-width, stroke-linecap:butt, round, square, stroke-linejoin:miter, round, bevel
  stroke-opacity, stroke-miterlimit, stroke-dasharray="x,y"

      <svg width="300" height="130">
      <circle cx="100" cy="100" r="100" fill="red" />
      <ellipse cx="100" cy="100" rx="100" ry="50" fill="orange" />
      <rect x="0" y="0" width="256" height="64" rx="5" ry="5" fill="yellow" />
      <polygon points="128,0 256,256 0,256" fill="green" />
      <line x1="0" y1="0" x2="256" y2="256" fill="blue" />
      <polyline points="0,256 50,150 100,100 150,50" fill="grey" />
      <path d="M100,160 Q128,190 156,160" fill="black" />
    </svg>
*/

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { copyToClipboard } from '../../../utils/copy';

function MyAnimatedComponent() {
  const containerRef = useRef();

  useGSAP(() => {
    // Your GSAP animation code here
    gsap.to('.my-box', { rotation: 360, duration: 1 });
  }, { scope: containerRef }); // Optional: scope animations to elements within the ref

  return (
    <div ref={containerRef}>
      <div className="my-box">Animate Me!</div>
    </div>
  );
}

// const TestComponent = () => {
//   const [timers] = useLocalStorage(LS_TIMERS_KEY, [], true);

//   return <div>
//     <SCWrapper>
//       I
//       <SCContents>
//         {timers.map(t => {
//           return (
//             <div key={t.description}>
//               <Countdown description={t.description} endDate={getCountdownDate(t.targetDate, t.time)} />
//             </div>
//           )
//         })}
//       </SCContents>
//     </SCWrapper>
//   </div>;
// };
export const HomeTest = () => {
  const handleCopyLocalStorage = () => {
    // const item1 = localStorage.getItem(LS_NOTES_KEY);
    // const item2 = localStorage.getItem(LS_TIMERS_KEY);
    // const item3 = localStorage.getItem(LS_FILES_KEY);
    // const item4 = localStorage.getItem(LS_CLIPBOARD_KEY);
    // const item5 = localStorage.getItem(LS_SNIPPETS_KEY);
    // const toCopy = [item1, item2, item3, item4, item5];

    const toCopy = Object.values(LS_KEYS).map(key => {
      return { key, value: localStorage.getItem(key) }
    });
    copyToClipboard(JSON.stringify(toCopy));
  };

  return (
    <div>
      {/* <TestComponent /> */}
      <MyAnimatedComponent />
      <button onClick={handleCopyLocalStorage}>Copy LocalStorage</button>
    </div>
  );
};
