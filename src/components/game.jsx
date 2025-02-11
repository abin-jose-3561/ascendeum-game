import React, { useState, useEffect } from "react";

const Game = () => {
  const rows = 10;
  const cells = rows * rows;
  const initialCell = Array(cells).fill(null);
  const [board, setBoard] = useState(initialCell);
  const [start, setStart] = useState(false);
  const [delay, setDelay] = useState(1);
  const [selectedCell, setSelectedCell] = useState(null);
  const [previousClickTime, setPreviousClickTime] = useState();
  const [newTime, setNewTime] = useState();
  const [pausedTime, setPausedTime] = useState();
  const [mouseClick, setMouseClick] = useState([]);

  const randomCell = () => {
    return Math.floor(Math.random() * cells);
  };
  const handleStart = () => {
    setStart(true);
    setSelectedCell(randomCell());
  };

  let timer;
  useEffect(() => {
    if (mouseClick.length === 0) {
      const date = new Date();
      const now = date.getTime();
      setNewTime(now);
    }
    if (start) {
      const date = new Date();
      const now = date.getTime();
      setPreviousClickTime(now);
      timer = setInterval(() => {
        setSelectedCell(randomCell());
      }, delay * 1000);
    }
    return () => clearInterval(timer);
  }, [start]);

  const handleCellClick = () => {
    const date = new Date();
    const now = date.getTime();
    setNewTime(now);
    console.log(now);

    const difference = ((now - newTime) / 1000).toFixed(2);
    console.log(difference);

    setPreviousClickTime(difference + delay * 1000);
    const newItem = {
      clickNumber: mouseClick.length + 1,
      clickTime: difference,
    };
    setSelectedCell(randomCell());
    setMouseClick((prev) => [...prev, newItem]);
  };

  console.log();
  const handleInputChange = (value) => {
    const delaySlected = parseInt(value);
    if (delaySlected <= 10) setDelay(delaySlected);
  };
  const handleReset = () => {
    setStart(false);
    setSelectedCell(null);
    setMouseClick([]);
  };
  const handlePause = () => {
    const date = new Date();
    const now = date.getTime();
    setStart(false);
    setSelectedCell(null);
    setPausedTime(now);
  };

  return (
    <div className="container">
      <div className="header">
        <button className="buttonheader" onClick={handleStart}>
          START
        </button>
        <button className="buttonheader" onClick={handlePause}>
          PAUSE
        </button>
        <button className="buttonheader" onClick={handleReset}>
          RESET
        </button>
        <input
          type="number"
          min={1}
          max={10}
          value={delay}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>
      {/* game Area */}
      <div className="gameArea">
        {board.map((item, index) => {
          return (
            <button
              className={`cell ${selectedCell === index ? "selectedCell" : ""}`}
              onClick={handleCellClick}
              disabled={selectedCell !== index}
            >
              {item}
            </button>
          );
        })}
      </div>

      {/* //table */}
      <div>
        <table>
          <thead>
            <tr className="table-row">
              <th className="table-cell">MouseClick Number</th>
              <th className="table-cell">Reaction Time</th>
            </tr>
          </thead>
          <tbody>
            {mouseClick.map((item) => {
              return (
                <tr>
                  <td className="data-cell">{item.clickNumber}</td>
                  <td className="data-cell">{item.clickTime}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Game;
