import Image from 'next/image'
import { BarContainer } from '@/modules/BarContainer'

export default function Home() {
  return (
    <main className="container flex h-screen">
      <BarContainer />
    </main>
  )
}
