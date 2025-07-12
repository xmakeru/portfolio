import { Suspense } from "react"
import AnimatedHeader from "./headerClient"

export default function Header() {
  return (
    <header
    className=""
    aria-label="Навигационное меню">
      <Suspense fallback={null}>
        <AnimatedHeader />
      </Suspense>
    </header>
  )
}
