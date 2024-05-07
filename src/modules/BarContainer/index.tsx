import { useEffect, useState } from 'react'
import { Bar } from '@/components/Bar/Bar'
import { CreateBar } from '@/components/CreateBar/CreateBar'
import { Bar as BarType, fetchBars } from './fetchBars'

export async function BarContainer() {
  const bars = await fetchBars()

  return (
    <div className="relative">
      <CreateBar
        style={{
          position: 'fixed',
          top: '10px',
          left: '10px',
          width: '300px',
          height: '300px',
        }}
      />
      <div className="flex gap-2">
        {bars.map((bar) => (
          <Bar id={bar.id} key={bar.id} title={bar.name} />
        ))}
      </div>
    </div>
  )
}
