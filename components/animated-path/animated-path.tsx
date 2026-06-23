import './animated-path.css';

// animated Path
export const Path = ({ d, strokeWidth }: { d: string; strokeWidth: number; }) => {
  return (
    <>
      {/* path-bg elements */}
      <path strokeWidth={strokeWidth }  className="stroke-white/10" d={d}></path>
      {/* animated lines */}
      <path strokeWidth={strokeWidth}  className="fire-line" d={d}></path>
    </>
  );
};

// animated Line
export const Line = ({
  x1,
  y1,
  x2,
  y2,
}: {
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}) => {
  return (
    <>
      {/* line-bg elements */}
      <line
        className="stroke-white/10 stroke-[0.5]"
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
      />
      {/* animated lines */}
      <line className="fire-line" x1={x1} y1={y1} x2={x2} y2={y2}></line>
    </>
  );
};
