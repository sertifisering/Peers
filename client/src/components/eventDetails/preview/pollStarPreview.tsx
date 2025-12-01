export const PollStarPreview = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-lg">Poll: Star Rating</h3>

      {[1, 2, 3].map((i) => (
        <div key={i} className="flex justify-between items-center p-3 bg-neutral-100 rounded-lg">
          <span>Choice {i}</span>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="w-4 h-4 bg-yellow-400 rounded shadow" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
