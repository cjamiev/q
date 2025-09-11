import { useState, useEffect } from 'react';
import { dateDifference } from '../utils/dateHelper';

export const useCountdown = ({ endDate }) => {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const calculateTimeLeft = () => {
            const startDate = new Date();
            const { days, hours, minutes, seconds } = dateDifference(startDate, endDate);

            if (days > 0) {
                setTimeLeft(`${days}d ${hours}h ${minutes}m`);
            } else if (hours > 0) {
                setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
            } else if (minutes > 0) {
                setTimeLeft(`${minutes}m ${seconds}s`);
            } else if (seconds > 0) {
                setTimeLeft(`${seconds}s`);
            } else {
                setTimeLeft('Time is up!');
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);

        return () => clearInterval(timer);
    }, [endDate]);

    return timeLeft;
}
