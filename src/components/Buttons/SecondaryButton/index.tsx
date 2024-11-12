import { ISecondaryButtonProps } from "@/types/buttonsType";

export default function SecondaryButton({ children }: ISecondaryButtonProps) {
  return (
    <button className="transition-3s active:opacity-100 hover:opacity-50 flex items-center gap-2 rounded-full justify-items-start py-2 px-5 border-2 border-red-50 bg-white text-black">
      {children}
    </button>
  );
}
