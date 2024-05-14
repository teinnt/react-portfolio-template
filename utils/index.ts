import { useLayoutEffect, useEffect } from 'react'

// Proper type for isomorphic use of layout effects
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Function to convert ISO date string to a more readable format
export function ISOToDate(date: string): string {
  if (date) {
    let convertDate = new Date(date)
    return (
      convertDate.getFullYear() +
      '-' +
      (convertDate.getMonth() + 1) +
      '-' +
      convertDate.getDate()
    )
  }
  return ''
}

// Function to get a random image URL from a predefined list
export function getRandomImage(): string {
  const randomImageUrl = [
    'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1638742385167-96fc60e12f59?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
    'https://images.unsplash.com/photo-1618367588411-d9a90fefa881?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1657295791913-5074c912398e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=996&q=80',
  ]
  return randomImageUrl[Math.floor(Math.random() * randomImageUrl.length)]
}
