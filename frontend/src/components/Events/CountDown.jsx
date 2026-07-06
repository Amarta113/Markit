import React, { useEffect, useState } from "react";

const calculateTimeLeft = () => {
  const difference = +new Date(data?.Finish_Date) - +new Date();
  let timeLeft = {};
  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  };

  return timeLeft;
};

export default function CountDown({data}) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => (
    <span key={interval} className="text-[25px] text-[#475ad2] mr-2">
      {timeLeft[interval]} {interval}
    </span>
  ));

  return (
    <div>
      {timerComponents.length ? (
        timerComponents
      ) : (
        <span className="text-[red] text-[25px]">Time&apos;s Up!</span>
      )}
    </div>
  );
}
