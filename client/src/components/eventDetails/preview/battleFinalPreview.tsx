export const BattleFinalPreview = () => {
  return (
    <div className="space-y-6 text-center">
      <h3 className="font-bold text-lg">Final Round</h3>

      <div className="w-full p-4 bg-yellow-200 rounded-xl shadow">
        <div className="font-bold text-neutral-900 mb-2">🔥 Final Match 🔥</div>

        <div className="flex items-center justify-center gap-4">
          <div className="w-16 h-16 rounded-lg bg-neutral-200" />
          <div className="text-xl font-bold">VS</div>
          <div className="w-16 h-16 rounded-lg bg-neutral-200" />
        </div>
      </div>
    </div>
  );
};
