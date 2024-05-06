import { Bar } from '@/components/Bar'
import { CreateBar } from '@/components/CreateBar'

export async function BarContainer() {
  // const
  // https://6638f23d4253a866a24fc563.mockapi.io/bars

  return (
    <div className="flex gap-2">
      <Bar id="1" title="Not Started" />
      <Bar id="2" title="Ready" />
      <Bar id="3" title="In Progress" />
      <Bar id="4" title="Blocked" />
      <Bar id="5" title="Cancelled" />
      <CreateBar />
    </div>
  )
}
