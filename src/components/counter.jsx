import { useState, useEffect } from "react";
import { useRefresh } from "../data/utils";

export const Countdown = ({ deadline }) => {
  const { timerRefresh } = useRefresh();

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let diff = Math.floor((deadline - Date.now()) / 1000);
    setDays(Math.floor(diff / 86400));
    diff %= 86400;
    setHours(Math.floor(diff / 3600));
    diff %= 3600;
    setMinutes(Math.floor(diff / 60));
    diff %= 60;
    setSeconds(diff);
  }, [deadline, timerRefresh]);

  const addLeadingZeros = (value) => {
    value = String(value);
    while (value.length < 2) value = "0" + value;
    return value;
  };

  return (
    <div id="countdown" className="text-center">
      <span className="col">
        <span className="col-element">
          <p className="number">{addLeadingZeros(days)}</p>
          <p className="text">{days < 2 ? "Day" : "Days"}</p>
        </span>
      </span>
      <span className="col">
        <span className="col-element">
          <p className="number">{addLeadingZeros(hours)}</p>
          <p className="text">{hours < 2 ? "Hour" : "Hours"}</p>
        </span>
      </span>
      <span className="col">
        <span className="col-element">
          <p className="number">{addLeadingZeros(minutes)}</p>
          <p className="text">{minutes < 2 ? "Minute" : "Minutes"}</p>
        </span>
      </span>
      <span className="col">
        <span className="col-element">
          <p className="number">{addLeadingZeros(seconds)}</p>
          <p className="text">{seconds < 2 ? "Second" : "Seconds"}</p>
        </span>
      </span>
      <p className="until">until launch</p>
    </div>
  );
};
