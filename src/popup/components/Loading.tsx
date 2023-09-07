function LoadSvg() {
  return (
    <div className="animate-bounce">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_608_7)">
          <rect width="48" height="48" fill="white" />
          <rect width="192" height="192" fill="#6CA967" />
          <path
            d="M30.3535 20.8301V24.9434H16.9941V20.8301H30.3535ZM18.5586 10.4062V36H13.2852V10.4062H18.5586ZM34.1152 10.4062V36H28.8594V10.4062H34.1152Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_608_7">
            <rect width="48" height="48" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export function ScreenLoading() {
  return (
    <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-screen bg-gray-400 bg-opacity-50 z-10">
      <LoadSvg />
    </div>
  );
}

export function Loading() {
  return (
    <div className="p-4 flex justify-center items-center">
      <LoadSvg />
    </div>
  );
}
