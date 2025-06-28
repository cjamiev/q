const ZERO = 0;
const ONE = 1;
const TWELVE = 12;

const convert24HourTo12HourClock = (hour) => {
  if (hour === ZERO) {
    return { hour: TWELVE, isPm: false };
  } else if (hour < TWELVE) {
    return { hour, isPm: false };
  } else if (hour === TWELVE) {
    return { hour, isPm: true };
  } else {
    return { hour: hour % TWELVE, isPm: true };
  }
};

const convert12HourTo24HourClock = (hour, isPm) => {
  if (!isPm && hour === TWELVE) {
    return ZERO;
  } else if (isPm && hour < TWELVE) {
    return hour + TWELVE;
  } else {
    return hour;
  }
};

export { convert12HourTo24HourClock, convert24HourTo12HourClock };
