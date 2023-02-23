import { NoTask } from './NoTask';
import { TaskProps, Task } from './Task';

interface TaskListProps {
  taskList: TaskProps[];
}

export function TaskList({ taskList }: TaskListProps) {
  if (taskList.length > 0) {
    return (
      <div className="container mt-4">
        {taskList.map((task: TaskProps, i: number) => {
          return <Task task={task.task} isDone={task.isDone} />;
        })}
      </div>
    );
  } else {
    return <NoTask />;
  }
}
