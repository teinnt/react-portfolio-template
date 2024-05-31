import React, { ReactNode, MouseEventHandler } from 'react'
import { useTheme } from 'next-themes'
import data from '../../data/portfolio.json'

interface ButtonProps {
  children: ReactNode
  type?: 'primary' | 'secondary'
  onClick?: MouseEventHandler<HTMLButtonElement>
  classes?: string
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'secondary',
  onClick,
  classes = '',
}) => {
  const { theme } = useTheme()

  const baseClasses = `text-sm tablet:text-base p-1 laptop:p-2 m-1 laptop:m-2 rounded-lg transition-all duration-300 ease-out first:ml-0 hover:scale-105 active:scale-100 link ${
    data.showCursor ? 'cursor-none' : ''
  } ${classes}`
  const primaryClasses = `${baseClasses} ${
    theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'
  }`
  const secondaryClasses = `${baseClasses} flex items-center ${
    theme === 'dark' ? 'hover:bg-slate-600 text-white' : 'hover:bg-slate-100'
  }`

  return (
    <button
      onClick={onClick}
      type="button"
      className={type === 'primary' ? primaryClasses : secondaryClasses}
    >
      {children}
    </button>
  )
}

export default Button
