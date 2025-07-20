import React from 'react'

interface HeaderTextProps {
    size?: string;
    text?: string;
    weight?: string;
    color?: string;
}
const HeaderText = ({size, text, weight, color ='text-zinc-300'} : HeaderTextProps) => {
  return (
    <span className={`${size ?? 'text-base'} ${weight ?? 'font-normal'} ${color}`}>{text}</span>
  )
}

export default HeaderText