'use client'

import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()
  const pathname = usePathname()

  const handleGoBack = () => {
    if (pathname.split("/").filter(Boolean).length >= 2) {
      const answer = confirm("Вы уверены что хотите покинуть текущую игру?")
      if (answer) {
        router.back()
        return 
      } else {
        return 
      }
    }

    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }


  return (
    <button 
      onClick={handleGoBack}
      className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg"
      aria-label="Вернуться на предыдущую страницу"
    >
      <div
      className='flex justify-center items-center gap-2'>
        <svg width="20" height="20" dataslot="icon" fill="none" strokeWidth={1.5} stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
        <span>Назад</span>
      </div>
    </button>
  )
}