import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import Image from 'next/image'

interface ServiceCardProps {
  name?: string
  description?: string
  imageSrc?: string
}

const ServiceCard: React.FC<ServiceCardProps> = ({ name, imageSrc }) => {
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 className="text-3xl">{name || 'Heading'}</h1>

      {imageSrc && <Image src={imageSrc} width={400} height={400} />}
    </div>
  )
}

export default ServiceCard
