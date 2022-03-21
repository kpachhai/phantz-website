/* eslint-disable jsx-a11y/anchor-is-valid */

export const CustomInput = ({ count, setCount, max }) => {
  const handleInput = ({ target: { value } }) => {
    let text = value.replace(/[^0-9.]/g, "").trim();
    if (text.length === 0) setCount(text);
    else setCount(Math.max(0, Math.min(max, parseInt(text))).toString());
  };

  const handleKey = (e) => {
    if (e.keyCode === 38) {
      increase();
      e.stopPropagation();
      e.preventDefault();
    }
    if (e.keyCode === 40) {
      decrease();
      e.stopPropagation();
      e.preventDefault();
    }
  };

  const handleWheel = (e) => {
    if (e.deltaY < 0) increase();
    else if (e.deltaY > 0) decrease();
  };

  const increase = () => {
    if (count.length === 0) setCount("1");
    else setCount(Math.min(parseInt(count) + 1, max).toString());
  };

  const decrease = () => {
    if (count.length === 0) setCount("0");
    else setCount(Math.max(parseInt(count) - 1, 1).toString());
  };

  return (
    <div id="counter">
      <div className="input">
        <input
          onChange={handleInput}
          value={count}
          onKeyDown={handleKey}
          onWheel={handleWheel}
        />
        <div>
          <a onClick={increase} className="btn btn-control">
            +
          </a>
          <a onClick={decrease} className="btn btn-control down">
            -
          </a>
        </div>
      </div>
      <p className="info">
        <a onClick={() => setCount(max.toString())} className="max">
          Max
        </a>{" "}
        ({max})
      </p>
    </div>
  );
};
