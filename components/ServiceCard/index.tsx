import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface ServiceCardProps {
  name?: string
  description?: string
  imageUrl?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  name,
  description,
  imageUrl,
}) => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 ${
        mounted && theme === 'dark' ? 'hover:bg-slate-800' : 'hover:bg-slate-50'
      } hover:scale-105 link`}
      style={{
        background: imageUrl ? `url(${imageUrl})` : undefined,
      }}
    >
      <h1 className="text-3xl">{name || 'Heading'}</h1>
      <p className="mt-5 opacity-40 text-xl">
        {description ||
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}
      </p>
    </div>
  )
}

export default ServiceCard
