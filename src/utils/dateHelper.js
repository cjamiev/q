export const dateDifference = (startDate, endDate) => {
    const difference = endDate.getTime() - startDate.getTime();

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

export const getWeeks = (days) => days / 7;
export const getMonths = (days) => days / 30;
export const getYears = (days) => days / 365;