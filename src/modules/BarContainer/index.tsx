import { Bar } from '@/components/Bar/Bar'
import { CreateBar } from '@/components/CreateBar/CreateBrand'

export async function BarContainer() {
  // const
  // https://6638f23d4253a866a24fc563.mockapi.io/bars

  return (
    <div className="flex gap-2">
      <Bar key="1" title="Not Started" />
      <Bar key="2" title="Ready" />
      <Bar key="3" title="In Progress" />
      <Bar key="4" title="Blocked" />
      <Bar key="5" title="Cancelled" />
      {/* <CreateBar /> */}
    </div>
  )
}
