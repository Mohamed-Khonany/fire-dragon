import "./animated-path.css";
import { Line, Path } from "./animated-path";
import Image from "next/image";
import Logo from "../../assets/images/logo/logo-banner.png";

export default function AnimatedBanner() {


  return (
    <>
      <div className="fire-wrapper relative flex items-center justify-center w-full h-full">
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

        {/* Logo Button */}
        <div>
          <Image
            src={Logo}
            height={300}
            width={300}
            alt="fire-dragon-logo"
            className="z-1 object-contain drop-shadow-lg transition-transform duration-500 ease-in-out transform "
            priority
          />
        </div>

        {/* Animated SVG background */}
        <svg
          className="fire-ai-bg absolute"
          style={{ fill: "none" }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="70 70 160 160"
          width="100%"
          height="760"
        >
          {/* Background lines (static) */}

          {/* the lines in near the logo */}
          <Line x1="138.03" y1="113.58" x2="138.03" y2="101.83" />
          <Line x1="146.01" y1="113.58" x2="146.01" y2="99.15" />
          <Line x1="153.99" y1="113.58" x2="153.99" y2="99.15" />
          <Line x1="161.97" y1="113.58" x2="161.97" y2="101.83" />
          <Line x1="169.95" y1="113.58" x2="169.95" y2="103.79" />
          <Line x1="130.05" y1="113.58" x2="130.05" y2="103.79" />
          <Line x1="169.95" y1="186.42" x2="169.95" y2="196.21" />
          <Line x1="161.97" y1="186.42" x2="161.97" y2="198.17" />
          <Line x1="153.99" y1="186.42" x2="153.99" y2="200.85" />
          <Line x1="146.01" y1="186.42" x2="146.01" y2="200.85" />
          <Line x1="138.03" y1="186.42" x2="138.03" y2="198.17" />
          <Line x1="130.05" y1="186.42" x2="130.05" y2="196.21" />

          {/* Left pins near logo */}
          <Line x1="113.58" y1="138.03" x2="101.83" y2="138.03" />
          <Line x1="113.58" y1="146.01" x2="99.15" y2="146.01" />
          <Line x1="113.58" y1="153.99" x2="99.15" y2="153.99" />
          <Line x1="113.58" y1="161.97" x2="101.83" y2="161.97" />
          <Line x1="113.58" y1="169.95" x2="103.79" y2="169.95" />
          <Line x1="113.58" y1="130.05" x2="103.79" y2="130.05" />

          {/* Right pins near logo */}
          <Line x1="186.42" y1="138.03" x2="198.17" y2="138.03" />
          <Line x1="186.42" y1="146.01" x2="200.85" y2="146.01" />
          <Line x1="186.42" y1="153.99" x2="200.85" y2="153.99" />
          <Line x1="186.42" y1="161.97" x2="198.17" y2="161.97" />
          <Line x1="186.42" y1="169.95" x2="196.21" y2="169.95" />
          <Line x1="186.42" y1="130.05" x2="196.21" y2="130.05" />

          {/*Up lines*/}
          <Line x1="150" y1="113.58" x2="150" y2="67.31" />
          <circle className="fire-dot" cx="150" cy="66.13" r="1.17" />

          <Line x1="157.98" y1="113.58" x2="157.98" y2="82.08" />
          <circle className="fire-dot" cx="157.98" cy="80.91" r="1.17" />

          <Line x1="142.02" y1="113.58" x2="142.02" y2="88.08" />
          <circle className="fire-dot" cx="142.02" cy="86.91" r="1.17" />

          <Path d="M126.06,113.58v-10.37c0-.72-.29-1.41-.8-1.92l-4.28-4.28c-.51-.51-.8-1.2-.8-1.92v-12.37" />
          <circle className="fire-dot" cx="120.19" cy="81.54" r="1.17" />

          <Path d="M165.96,113.58v-18.37c0-.72.29-1.41.8-1.92l4.28-4.28c.51-.51.8-1.2.8-1.92v-14.37" />
          <circle className="fire-dot" cx="171.83" cy="71.54" r="1.17" />

          <Path d="M173.94,113.58v-10.37c0-.72.29-1.41.8-1.92l4.28-4.28c.51-.51.8-1.2.8-1.92v-10.69" />
          <circle className="fire-dot" cx="179.81" cy="83.23" r="1.17" />

          <Path d="M134.04,113.58v-20.37c0-.72-.29-1.41-.8-1.92l-4.28-4.28c-.51-.51-.8-1.2-.8-1.92v-9.37" />
          <circle className="fire-dot" cx="128.17" cy="74.54" r="1.17" />

          {/* Right lines (rotated from Up) */}

          <Line x1="186.42" y1="150" x2="232.69" y2="150" />
          <circle className="fire-dot" cx="233.87" cy="150" r="1.17" />

          <Line x1="186.42" y1="157.98" x2="217.92" y2="157.98" />
          <circle className="fire-dot" cx="219.09" cy="157.98" r="1.17" />

          <Line x1="186.42" y1="142.02" x2="211.92" y2="142.02" />
          <circle className="fire-dot" cx="213.09" cy="142.02" r="1.17" />

          <Path d="M186.42,126.06h10.37c.72,0,1.41-.29,1.92-.8l4.28-4.28c.51,-.51,1.2,-.8,1.92,-.8h12.37" />
          <circle className="fire-dot" cx="218.46" cy="120.19" r="1.17" />

          <Path d="M186.42,165.96h18.37c.72,0,1.41.29,1.92.8l4.28,4.28c.51,.51,1.2,.8,1.92,.8h14.37" />
          <circle className="fire-dot" cx="228.46" cy="171.83" r="1.17" />

          <Path d="M186.42,173.94h10.37c.72,0,1.41.29,1.92.8l4.28,4.28c.51,.51,1.2,.8,1.92,.8h10.69" />
          <circle className="fire-dot" cx="216.77" cy="179.81" r="1.17" />

          <Path d="M186.42,134.04h20.37c.72,0,1.41-.29,1.92-.8l4.28-4.28c.51,-.51,1.2,-.8,1.92,-.8h9.37" />
          <circle className="fire-dot" cx="225.46" cy="128.17" r="1.17" />

          {/* Left lines (rotated from Down) */}

          <Line x1="113.58" y1="150" x2="67.31" y2="150" />
          <circle className="fire-dot" cx="66.13" cy="150" r="1.17" />

          <Line x1="113.58" y1="142.02" x2="82.08" y2="142.02" />
          <circle className="fire-dot" cx="80.91" cy="142.02" r="1.17" />

          <Line x1="113.58" y1="157.98" x2="88.08" y2="157.98" />
          <circle className="fire-dot" cx="86.91" cy="157.98" r="1.17" />

          <Path d="M113.58,173.94h-10.37c-.72,0-1.41.29-1.92.8l-4.28,4.28c-.51,.51,-1.2,.8,-1.92,.8h-12.37" />
          <circle className="fire-dot" cx="81.54" cy="179.81" r="1.17" />

          <Path d="M113.58,134.04h-18.37c-.72,0-1.41-.29-1.92-.8l-4.28-4.28c-.51,-.51,-1.2,-.8,-1.92,-.8h-14.37" />
          <circle className="fire-dot" cx="71.54" cy="128.17" r="1.17" />

          <Path d="M113.58,126.06h-10.37c-.72,0-1.41-.29-1.92-.8l-4.28-4.28c-.51,-.51,-1.2,-.8,-1.92,-.8h-10.69" />
          <circle className="fire-dot" cx="83.23" cy="120.19" r="1.17" />

          <Path d="M113.58,165.96h-20.37c-.72,0-1.41.29-1.92.8l-4.28,4.28c-.51,.51,-1.2,.8,-1.92,.8h-9.37" />
          <circle className="fire-dot" cx="74.54" cy="171.83" r="1.17" />

          {/*Down lines*/}
          <Line x1="150" y1="186.42" x2="150" y2="232.69" />
          <circle className="fire-dot" cx="150" cy="233.87" r="1.17" />

          <Line x1="142.02" y1="186.42" x2="142.02" y2="217.92" />
          <circle className="fire-dot" cx="142.02" cy="219.09" r="1.17" />

          <Line x1="157.98" y1="186.42" x2="157.98" y2="211.92" />
          <circle className="fire-dot" cx="157.98" cy="213.09" r="1.17" />

          <Path d="M173.94,186.42v10.37c0,.72.29,1.41.8,1.92l4.28,4.28c.51.51.8,1.2.8,1.92v12.37" />
          <circle className="fire-dot" cx="179.81" cy="218.46" r="1.17" />

          <Path d="M134.04,186.42v18.37c0,.72-.29,1.41-.8,1.92l-4.28,4.28c-.51.51-.8,1.2-.8,1.92v14.37" />
          <circle className="fire-dot" cx="128.17" cy="228.46" r="1.17" />

          <Path d="M126.06,186.42v10.37c0,.72-.29,1.41-.8,1.92l-4.28,4.28c-.51.51-.8,1.2-.8,1.92v10.69" />
          <circle className="fire-dot" cx="120.19" cy="216.77" r="1.17" />

          <Path d="M165.96,186.42v20.37c0,.72.29,1.41.8,1.92l4.28,4.28c.51.51.8,1.2.8,1.92v9.37" />
          <circle className="fire-dot" cx="171.83" cy="225.46" r="1.17" />

          {/* The diagonal lines */}
          <Path d="M186.42 113.58 L195 105 H215 L225 95 H245" />
          <circle className="fire-dot" cx="246" cy="95" r="1.17" />

          <Path d="M186.42 186.42 L198 198 H220 L235 212 H255" />
          <circle className="fire-dot" cx="256" cy="212" r="1.17" />

          <Path d="M113.58 113.58 L105 105 H85 L75 95 H55" />
          <circle className="fire-dot" cx="54" cy="95" r="1.17" />

          <Path d="M113.58 186.42 L102 198 H80 L65 212 H45" />
          <circle className="fire-dot" cx="44" cy="212" r="1.17" />
        </svg>
      </div>
    </>
  );
}
