"use client";

import "./animated-path.css";
import { Line, Path } from "./animated-path";

export default function AnimatedBanner() {
  return (
    <>
      <div className="fire-wrapper relative flex items-center justify-center w-max h-max">
        {/* Glow light top-left */}
        <div
          className="fire-light-1 pointer-events-none absolute rounded-full z-10"
          style={{
            top: "-20px",
            left: "-30px",
            width: "100px",
            height: "70px",
            backgroundColor: "var(--light-1)",
            filter: "blur(24px)",
          }}
        />

        {/* Glow light bottom-right */}
        <div
          className="fire-light-2 pointer-events-none absolute rounded-full"
          style={{
            bottom: "-20px",
            right: "-20px",
            width: "80px",
            height: "40px",
            backgroundColor: "var(--light-2)",
            filter: "blur(24px)",
            zIndex: -1,
          }}
        />
        {/* Animated SVG background */}
        <svg
          className="fire-ai-bg absolute -top-110"
          style={{ fill: "none" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="70 70 160 160"
          width="700"
          height="700"
        >
          {/* Background lines (static) */}

          {/* the lines in neer the logo */}
          <Line x1="138.03" y1="123.58" x2="138.03" y2="111.83" />
          <Line x1="146.01" y1="123.58" x2="146.01" y2="109.15" />
          <Line x1="153.99" y1="123.58" x2="153.99" y2="109.15" />
          <Line x1="161.97" y1="123.58" x2="161.97" y2="111.83" />
          <Line x1="169.95" y1="123.58" x2="169.95" y2="113.79" />
          <Line x1="130.05" y1="123.58" x2="130.05" y2="113.79" />
          <Line x1="169.95" y1="176.42" x2="169.95" y2="186.21" />
          <Line x1="161.97" y1="176.42" x2="161.97" y2="188.17" />
          <Line x1="153.99" y1="176.42" x2="153.99" y2="190.85" />
          <Line x1="146.01" y1="176.42" x2="146.01" y2="190.85" />
          <Line x1="138.03" y1="176.42" x2="138.03" y2="188.17" />
          <Line x1="130.05" y1="176.42" x2="130.05" y2="186.21" />

          {/*Up lines*/}
          <Line x1="150" y1="123.58" x2="150" y2="77.31" />
          <circle className="fire-dot" cx="150" cy="76.13" r="1.17" />

          <Line x1="157.98" y1="123.58" x2="157.98" y2="92.08" />
          <circle className="fire-dot" cx="157.98" cy="90.91" r="1.17" />

          <Line x1="142.02" y1="123.58" x2="142.02" y2="98.08" />
          <circle className="fire-dot" cx="142.02" cy="96.91" r="1.17" />

          <Path d="M126.06,123.58v-10.37c0-.72-.29-1.41-.8-1.92l-4.28-4.28c-.51-.51-.8-1.2-.8-1.92v-12.37" />
          <circle className="fire-dot" cx="120.19" cy="91.54" r="1.17" />
          
          <Path d="M165.96,123.58v-18.37c0-.72.29-1.41.8-1.92l4.28-4.28c.51-.51.8-1.2.8-1.92v-14.37" />
          <circle className="fire-dot" cx="171.83" cy="81.54" r="1.17" />
          
          <Path d="M173.94,123.58v-10.37c0-.72.29-1.41.8-1.92l4.28-4.28c.51-.51.8-1.2.8-1.92v-10.69" />
          <circle className="fire-dot" cx="179.81" cy="93.23" r="1.17" />
          
          <Path d="M134.04,123.58v-20.37c0-.72-.29-1.41-.8-1.92l-4.28-4.28c-.51-.51-.8-1.2-.8-1.92v-9.37" />
          <circle className="fire-dot" cx="128.17" cy="84.54" r="1.17" />


          {/*Right lines*/}
          <Line x1="176.04" y1="150" x2="217.32" y2="150" />
          <circle className="fire-dot" cx="218.49" cy="150" r="1.17" />
          
          <Path d="M176.04,153.99h13.37c.72,0,1.41.29,1.92.8l4.28,4.28c.51.51,1.2.8,1.92.8h14.37" />
          <circle className="fire-dot" cx="213.08" cy="159.86" r="1.17" />

          <Path d="M176.04,146.01h15.37c.72,0,1.41-.29,1.92-.8l4.28-4.28c.51-.51,1.2-.8,1.92-.8h9.37" />
          <circle className="fire-dot" cx="210.08" cy="140.14" r="1.17" />


          {/*Left lines*/}
          <Line x1="123.96" y1="150" x2="82.68" y2="150" />
          <circle className="fire-dot" cx="81.51" cy="150" r="1.17" />

          <Path d="M123.96,146.01h-13.37c-.72,0-1.41-.29-1.92-.8l-4.28-4.28c-.51-.51-1.2-.8-1.92-.8h-14.37" />
          <circle className="fire-dot" cx="86.92" cy="140.14" r="1.17" />
          
          <Path d="M123.96,153.99h-15.37c-.72,0-1.41.29-1.92.8l-4.28,4.28c-.51.51-1.2.8-1.92.8h-9.37" />
          <circle className="fire-dot" cx="89.92" cy="159.86" r="1.17" />


          {/*Down lines*/}
          <Line x1="150" y1="176.42" x2="150" y2="222.69" />
          <circle className="fire-dot" cx="150" cy="223.87" r="1.17" />
          
          <Line x1="142.02" y1="176.42" x2="142.02" y2="207.92" />
          <circle className="fire-dot" cx="142.02" cy="209.09" r="1.17" />

          <Line x1="157.98" y1="176.42" x2="157.98" y2="201.92" />
          <circle className="fire-dot" cx="157.98" cy="203.09" r="1.17" />

          <Path d="M173.94,176.42v10.37c0,.72.29,1.41.8,1.92l4.28,4.28c.51.51.8,1.2.8,1.92v12.37" />
          <circle className="fire-dot" cx="179.81" cy="208.46" r="1.17" />
          
          <Path d="M134.04,176.42v18.37c0,.72-.29,1.41-.8,1.92l-4.28,4.28c-.51.51-.8,1.2-.8,1.92v14.37" />
          <circle className="fire-dot" cx="128.17" cy="218.46" r="1.17" />
          
          <Path d="M126.06,176.42v10.37c0,.72-.29,1.41-.8,1.92l-4.28,4.28c-.51.51-.8,1.2-.8,1.92v10.69" />
          <circle className="fire-dot" cx="120.19" cy="206.77" r="1.17" />
          
          <Path d="M165.96,176.42v20.37c0,.72.29,1.41.8,1.92l4.28,4.28c.51.51.8,1.2.8,1.92v9.37" />
          <circle className="fire-dot" cx="171.83" cy="215.46" r="1.17" />

        </svg>
      </div>
    </>
  );
}
