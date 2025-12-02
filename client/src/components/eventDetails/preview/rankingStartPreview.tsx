export const RankingStarPreview = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Star Rating</h3>

      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-neutral-100">
          <span>Athlete {i}</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="w-5 h-5 bg-yellow-400 rounded shadow-sm" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
