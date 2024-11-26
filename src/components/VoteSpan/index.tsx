import { voteFormat } from "@/utils/voteFormat"

interface IVoteSpan {
  vote: string | number | undefined
}
export default function VoteSpan({ vote }: IVoteSpan) {
  const voteFormated = typeof vote === 'number' ? voteFormat(vote) : vote;
  return (
    <span className={"flex w-[2.5rem] h-10 rounded-md justify-center p-2 items-center bg-simbioxGreen font-bold text-purpleBg"}>
      {voteFormated}
    </span>
  )
}