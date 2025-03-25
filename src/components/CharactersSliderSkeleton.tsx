export const CharactersSliderSkeleton = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="w-[305px] h-[284px] rounded-sm shadow-md">
            <div className="w-full h-[240px] rounded-sm bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    </>
  );
};
