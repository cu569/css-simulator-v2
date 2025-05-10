import { useState, useRef } from "react";

export default function Home() {
  const boardWidth = 600;
  const boardHeight = 300;
  const cueRadius = 15;

  const initialPositions = {
    cue: { x: 100, y: 100 },
    red: { x: 200, y: 150 },
    yellow: { x: 300, y: 80 },
  };

  const [positions, setPositions] = useState(initialPositions);
  const [pathPoints, setPathPoints] = useState([]);
  const [isMoving, setIsMoving] = useState(false);

  const cueRef = useRef(initialPositions.cue);

  const reset = () => {
    setPositions(initialPositions);
    cueRef.current = initialPositions.cue;
    setPathPoints([]);
    setIsMoving(false);
  };

  const handleClick = (e) => {
    if (isMoving) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left - cueRadius;
    const clickY = e.clientY - rect.top - cueRadius;

    const cue = cueRef.current;
    const dx = clickX - cue.x;
    const dy = clickY - cue.y;
    const length = Math.hypot(dx, dy);
    const dir = { x: dx / length, y: dy / length };

    const newPoints = [cue];
    let currentPos = { ...cue };
    let direction = { ...dir };

    for (let i = 0; i < 3; i++) {
      let tX = Infinity, tY = Infinity;

      if (direction.x > 0) tX = (boardWidth - cueRadius * 2 - currentPos.x) / direction.x;
      else if (direction.x < 0) tX = -currentPos.x / direction.x;

      if (direction.y > 0) tY = (boardHeight - cueRadius * 2 - currentPos.y) / direction.y;
      else if (direction.y < 0) tY = -currentPos.y / direction.y;

      const t = Math.min(tX, tY);
      const nextX = currentPos.x + direction.x * t;
      const nextY = currentPos.y + direction.y * t;

      currentPos = { x: nextX, y: nextY };
      newPoints.push(currentPos);

      if (tX < tY) direction.x *= -1;
      else direction.y *= -1;
    }

    setPathPoints(newPoints);
    animateCue(newPoints);
  };

  const animateCue = async (points) => {
    setIsMoving(true);
    for (let i = 1; i < points.length; i++) {
      const start = points[i - 1];
      const end = points[i];
      const steps = 50;
      const dx = (end.x - start.x) / steps;
      const dy = (end.y - start.y) / steps;

      for (let s = 0; s < steps; s++) {
        cueRef.current = {
          x: cueRef.current.x + dx,
          y: cueRef.current.y + dy
        };
        setPositions((prev) => ({
          ...prev,
          cue: { ...cueRef.current }
        }));
        await new Promise((r) => setTimeout(r, 10));
      }
    }
    setIsMoving(false);
  };

  const drawLine = (p1, p2, color = "white") => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const length = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    return {
      position: "absolute",
      left: p1.x + cueRadius,
      top: p1.y + cueRadius,
      width: length,
      height: 2,
      backgroundColor: color,
      transform: `rotate(${angle}rad)`,
      transformOrigin: "0 0",
    };
  };

  const ballStyle = (pos, color) => ({
    position: "absolute",
    left: pos.x,
    top: pos.y,
    width: cueRadius * 2,
    height: cueRadius * 2,
    borderRadius: "50%",
    backgroundColor: color,
    textAlign: "center",
    lineHeight: `${cueRadius * 2}px`,
    fontWeight: "bold",
    color: color === "yellow" ? "#000" : "#fff",
    border: "1px solid black",
  });

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: boardWidth,
          height: boardHeight,
          backgroundColor: "#228B22",
          margin: "30px auto",
          borderRadius: "10px",
        }}
        onClick={handleClick}
      >
        {pathPoints.length >= 2 &&
          pathPoints.map((p, i) =>
            i < pathPoints.length - 1 ? (
              <div key={i} style={drawLine(p, pathPoints[i + 1], "white")} />
            ) : null
          )}

        <div style={ballStyle(positions.cue, "white")}>1</div>
        <div style={ballStyle(positions.red, "yellow")}>2</div>
        <div style={ballStyle(positions.yellow, "red")}>3</div>
      </div>

      <div style={{ textAlign: "center", fontSize: "18px" }}>
        <button onClick={reset} style={buttonStyle} disabled={isMoving}>
          초기화
        </button>
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  backgroundColor: "#0066cc",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer"
};

