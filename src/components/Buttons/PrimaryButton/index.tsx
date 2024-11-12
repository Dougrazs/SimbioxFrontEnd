interface IPrimaryButtonProps {
  children: React.ReactNode;
}
export default function PrimaryButton({ children }: IPrimaryButtonProps) {
  return (
    <button className="transition-3s active:opacity-100 hover:opacity-50 flex items-center gap-2 rounded-xl justify-items-start py-2 px-5 border-2 border-red-50 bg-white text-black">
      {children}
    </button>
  );
}
