export const CharactersListSkeleton = () => {
  return (
    <>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={index} className="w-[305px] h-[284px] rounded-sm shadow-md">
          <div className="w-full h-[240px] rounded-sm bg-gray-200 animate-pulse" />
        </div>
      ))}
    </>
  );
};
