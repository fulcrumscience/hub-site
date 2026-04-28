'use client'
import { useEffect } from 'react'

const FOLDER_PATHS: Record<string, string> = {
  'New to AI': '/foundations',
  'Biology': '/biology',
  'Chemistry': '/chemistry',
  'Earth & Climate': '/earth-climate',
  'Materials': '/materials',
  'Physics': '/physics',
}

export function SidebarNav() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const btn = (e.target as Element).closest('aside li button')
      if (!btn) return
      const text = (btn.textContent ?? '').replace(/\s+/g, ' ').trim()
      const path = FOLDER_PATHS[text]
      if (path) window.location.href = path
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  return null
}
