import React, { MouseEventHandler } from 'react'

interface WorkCardProps {
  img: string
  name?: string
  description?: string
  onClick?: MouseEventHandler<HTMLDivElement>
}

const WorkCard: React.FC<WorkCardProps> = ({
  img,
  name,
  description,
  onClick,
}) => {
  return (
    <div
      className="overflow-hidden rounded-lg p-2 laptop:p-4 first:ml-0 link"
      onClick={onClick}
    >
      <div
        className="relative rounded-lg overflow-hidden transition-all ease-out duration-300 h-48 mob:h-auto"
        style={{ height: '600px' }}
      >
        <img
          alt={name || 'Project Name'}
          className="h-full w-full object-cover hover:scale-110 transition-all ease-out duration-300"
          src={img}
        />
      </div>
      <h1 className="mt-5 text-3xl font-medium">{name || 'Project Name'}</h1>
      <h2 className="text-xl opacity-50">{description || 'Description'}</h2>
    </div>
  )
}

export default WorkCard
