'use client'
import { TextButton } from '@/components'
import Link from 'next/link'
import { linksData } from './linksData'
import { usePathname } from 'next/navigation';
export default function Menu() {
  const path = usePathname();

  return (
    <header className="flex gap-3 py-2 items-center justify-center w-full">
      {linksData.map((el, key) => {
        const isActive = el?.ref === path
        return (
          <Link key={key} href={`${el.ref}`}>
            <TextButton active={isActive}>{el.text}</TextButton>
          </Link>
        )
      })}
    </header>
  );
}
