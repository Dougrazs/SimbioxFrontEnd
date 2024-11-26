import React from 'react'
import { CgSpinnerAlt } from "react-icons/cg";
export default function Spinner() {
  return (
    <div className={'animate-spin flex items-center'}>
      <CgSpinnerAlt size={50} />
    </div>
  )
}

