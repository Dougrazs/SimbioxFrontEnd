interface IPrimaryButtonProps {
  children: React.ReactNode;
}
export default function BoxContainer({ children }: IPrimaryButtonProps) {
  return (
    <div className="flex items-center gap-2 rounded-2xl justify-items-start py-2 px-5 bg-purpleBg">
      {children}
    </div>
  );
}
