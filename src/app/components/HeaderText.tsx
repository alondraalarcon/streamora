import React from 'react'

interface HeaderTextProps {
    size: string | null;
    text: string;
    weight: string | null;
    color: string  | null;
}
const HeaderText = ({size, text, weight, color ='text-zinc-300'} : HeaderTextProps) => {
  return (
    <span className={`${size ?? 'text-base'} ${weight ?? 'font-normal'} ${color}`}>{text}</span>
  )
}

export default HeaderText