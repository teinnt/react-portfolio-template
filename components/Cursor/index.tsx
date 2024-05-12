import React, { useEffect, useState } from 'react'
import CustomCursor from 'custom-cursor-react'
import 'custom-cursor-react/dist/index.css'
import { useTheme } from 'next-themes'

const Cursor: React.FC = () => {
  const { theme } = useTheme()
  const [mount, setMount] = useState<boolean>(false)

  const getCustomColor = (): string => {
    if (theme === 'dark') {
      return '#fff' // White cursor for dark theme
    } else if (theme === 'light') {
      return '#000' // Black cursor for light theme
    }
    return '#000' // Default cursor color
  }

  useEffect(() => {
    setMount(true)
  }, [])

  return (
    <>
      {mount && (
        <CustomCursor
          targets={['.link']}
          customClass="custom-cursor"
          dimensions={30}
          fill={getCustomColor()}
          smoothness={{
            movement: 0.2,
            scale: 0.1,
            opacity: 0.2,
          }}
          targetOpacity={0.5}
          targetScale={2}
        />
      )}
    </>
  )
}

export default Cursor
