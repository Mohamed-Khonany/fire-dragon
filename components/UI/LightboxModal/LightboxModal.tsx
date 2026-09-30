import { useEffect, useRef } from "react";

const LightboxModal = ({ src, onClose }:{ src: string; onClose: () => void }) => {
  const modalRef = useRef(null); // Reference for the modal container

  // Close the modal if clicked outside
  useEffect(() => {
    const handleClickOutside = ({event}:{ event: MouseEvent }) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // Close the modal when clicked outside
      }
    };

    // Add event listener for clicks outside the modal
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-75">
      <div
        ref={modalRef} // Attach the ref to the modal container
        className="object-contain"
      >
        <img
          className="lg:max-w-screen-lg lg:max-h-screen md:max-w-screen-lg md:max-h-screen object-contain mx-auto rounded-lg"
          src={src}
          alt=""
        />
        <button
          type="button"
          className="absolute top-4 right-4 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          onClick={onClose}
        >
          <svg
            aria-hidden="true"
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LightboxModal;
