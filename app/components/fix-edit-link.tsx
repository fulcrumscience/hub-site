'use client'

import { useEffect } from 'react'

export function FixEditLink() {
  useEffect(() => {
    // Find and fix edit link hrefs
    const observer = new MutationObserver(() => {
      const editLinks = document.querySelectorAll('a[href*="/content/"]')
      editLinks.forEach(link => {
        const href = link.getAttribute('href')
        if (href?.includes('github.com') && href.includes('/content/')) {
          link.setAttribute('href', href.replace('/content/', '/'))
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })

    // Initial fix
    const editLinks = document.querySelectorAll('a[href*="/content/"]')
    editLinks.forEach(link => {
      const href = link.getAttribute('href')
      if (href?.includes('github.com') && href.includes('/content/')) {
        link.setAttribute('href', href.replace('/content/', '/'))
      }
    })

    return () => observer.disconnect()
  }, [])

  return null
}
