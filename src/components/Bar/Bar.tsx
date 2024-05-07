import { cn } from '@/lib/utils'
import { fetchTasks } from './fetchTasks'
import { TaskCard } from '../TaskCard'
import { CreateTaskButton } from './createTaskButton'

interface IBarProps {
  id: string
  title: string
}

export const Bar = async ({ id, title }: IBarProps) => {
  const tasks = await fetchTasks(id)

  return (
    <div className="flex min-w-48 flex-col">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">{title}</h2>
        <CreateTaskButton barId={id} />
      </div>
      <div
        className={cn(
          'flex flex-1 flex-col gap-2 rounded border-2 border-border bg-muted p-2'
        )}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  )
}
