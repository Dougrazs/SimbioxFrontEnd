export interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export interface ISecondaryButtonProps extends IButtonProps {
  active?: boolean
}