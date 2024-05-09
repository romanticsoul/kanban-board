export interface ITask {
  title: string
  description: string
  order: number
  createdAt: number
  updatedAt: number
  bar_id: string
  id: string
}

export interface IBar {
  id: string
  name: string
  updatedAt: number
  createdAt: number
}
