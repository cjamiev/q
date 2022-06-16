import { convert12HourTo24HourClock, convert24HourTo12HourClock } from './helper';

const ZERO = 0;
const ONE = 1;
const ELEVEN = 11;
const TWELVE = 12;
const THIRTEEN = 13;
const TWENTYTHREE = 23;

describe('helper (form)', () => {
  describe('convert12HourTo24HourClock', () => {
    it('at 12am', () => {
      const result = convert12HourTo24HourClock(TWELVE, false);

      expect(result).toEqual(ZERO);
    });

    it('at 1am', () => {
      const result = convert12HourTo24HourClock(ONE, false);

      expect(result).toEqual(ONE);
    });

    it('at 12pm', () => {
      const result = convert12HourTo24HourClock(TWELVE, true);

      expect(result).toEqual(TWELVE);
    });

    it('at 1pm', () => {
      const result = convert12HourTo24HourClock(ONE, true);

      expect(result).toEqual(THIRTEEN);
    });

    it('at 11pm', () => {
      const result = convert12HourTo24HourClock(ELEVEN, true);

      expect(result).toEqual(TWENTYTHREE);
    });
  });

  describe('convert24HourTo12HourClock', () => {
    it('at 0', () => {
      const result = convert24HourTo12HourClock(ZERO);

      expect(result).toEqual({ hour: 12, isPm: false });
    });

    it('at 1', () => {
      const result = convert24HourTo12HourClock(ONE);

      expect(result).toEqual({ hour: 1, isPm: false });
    });

    it('at 12', () => {
      const result = convert24HourTo12HourClock(TWELVE);

      expect(result).toEqual({ hour: 12, isPm: true });
    });

    it('at 13', () => {
      const result = convert24HourTo12HourClock(THIRTEEN);

      expect(result).toEqual({ hour: 1, isPm: true });
    });

    it('at 23', () => {
      const result = convert24HourTo12HourClock(TWENTYTHREE);

      expect(result).toEqual({ hour: 11, isPm: true });
    });
  });
});
