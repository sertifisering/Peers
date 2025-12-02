export const BattlePreview = ({}: any) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex gap-6 items-center">
        <div className="w-20 h-20 bg-gray-700 rounded-lg"></div>
        <div className="text-2xl font-bold">VS</div>
        <div className="w-20 h-20 bg-gray-700 rounded-lg"></div>
      </div>

      <div className="flex gap-4 w-full">
        <button className="flex-1 py-3 bg-blue-600 rounded-md font-semibold">A</button>
        <button className="flex-1 py-3 bg-orange-500 rounded-md font-semibold">B</button>
      </div>
    </div>
  );
};
