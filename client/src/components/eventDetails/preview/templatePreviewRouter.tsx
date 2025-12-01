import { PreviewFrame } from "./previewFrame";

import { RankingSliderPreview } from "./rankingSliderPreview";
import { RankingStarPreview } from "./rankingStarPreview";
import { RankingLikePreview } from "./rankingLikePreview";

import { BattleVsPreview } from "./battleVsPreview";
import { BattleFinalPreview } from "./battleFinalPreview";

import { PollVotePreview } from "./pollVotePreview";
import { PollSliderPreview } from "./pollSliderPreview";
import { PollStarPreview } from "./pollStarPreview";

export const TemplatePreviewRouter = ({ eventFormat, template }: any) => {
  const format = eventFormat || "ranking";

  const getRankingPreview = () => {
    switch (template.scoringFormat) {
      case "Score Voting":
        return <RankingSliderPreview />;
      case "Star Rating":
        return <RankingStarPreview />;
      case "Like/Dislike":
        return <RankingLikePreview />;
      default:
        return <RankingSliderPreview />;
    }
  };

  const getBattlePreview = () => {
    return <BattleVsPreview />;
  };

  const getPollPreview = () => {
    switch (template.pollFormat) {
      case "Like Voting":
        return <PollVotePreview />;
      case "Score Voting":
        return <PollSliderPreview />;
      case "Star Rating":
        return <PollSliderPreview />;
      default:
        return <PollVotePreview />;
    }
  };

  return (
    <PreviewFrame>
      {format === "ranking" && getRankingPreview()}
      {format === "battle" && getBattlePreview()}
      {format === "poll" && getPollPreview()}
    </PreviewFrame>
  );
};
