'use client'

import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/') 
    }
  }

  return (
    <button 
      onClick={handleGoBack}
      className="px-4 py-2 bg-[#FFA552] text-black rounded"
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