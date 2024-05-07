import React from 'react'

interface ICardProps {
  message: string
}

export const Card: React.FC<ICardProps> = ({ message }) => {
  return <div>Card</div>
}
