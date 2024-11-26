export const voteFormat = (vote: number) => {
  const roundedVote = Math.round(vote * 10) / 10;
  return roundedVote.toFixed(1);
};