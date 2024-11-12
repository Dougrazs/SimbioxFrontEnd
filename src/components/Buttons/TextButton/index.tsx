import { IButtonProps } from "@/types/buttonsType";

export default function TextButton({ children }: IButtonProps) {
  return (
    <button className="transition-3s 
    active:opacity-100 
    hover:opacity-50 flex items-center gap-2
    py-2 px-5 border-b
   border-gray
    decoration-gray">
      <p className={"border-b text-gray"}>
        {children}
      </p>
    </button>
  );
}
