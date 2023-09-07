export function Popup({ children }: any) {
  return (
    <div className="relative p-4 m-2 bg-gray-300 h-100 overflow-y-auto rounded drop-shadow-lg">
      {children}
    </div>
  );
}
