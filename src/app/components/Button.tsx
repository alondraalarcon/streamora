import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  text: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  url?: string;
  color?: string;
}
const Button = ({
  text,
  backgroundColor,
  hoverBackgroundColor,
  url = '#',
  color,
}: ButtonProps) => {
  return (
    <Link href={url}>
      <button
        className={`p-3 w-50 text-center rounded-lg ${backgroundColor} hover:${hoverBackgroundColor} ${
          color ?? 'text-white'
        } cursor-pointer`}
      >
        {' '}
        {text}
      </button>
    </Link>
  );
};

export default Button;
