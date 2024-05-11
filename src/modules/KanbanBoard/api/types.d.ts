export interface IBar {
  id: string
  name: string
  order: string
}

export interface ITask {
  id: string
  barId: IBar['id']
  title: string
  description: string
  order: number
}
