export const FireSpan = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={`text-transparent bg-clip-text bg-linear-to-r from-primary-container to-secondary ${className}`}
    >
      {children}
    </span>
  );
};

export const FireDev = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`magnetic-btn  text-center justify-center items-center bg-linear-to-r from-primary-container to-secondary text-on-primary text-headline-md md:text-[20px] rounded hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,90,0,0.4)] ${className}`}
    >
      {children}
    </div>
  );
};
