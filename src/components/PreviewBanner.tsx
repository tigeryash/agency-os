import React from 'react'

export function PreviewBanner({ currentPath }: { currentPath: string }) {
  const exitUrl = `/preview/exit?path=${encodeURIComponent(currentPath)}`

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full bg-amber-500 text-black px-4 py-2 text-center text-sm font-medium">
      Viewing Draft{' '}
      <a href={exitUrl} className="underline font-bold ml-2">
        Exit Preview
      </a>
    </div>
  )
}
