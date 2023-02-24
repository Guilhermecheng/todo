import { NoTask } from './NoTask';
import { Task } from './Task';
import { GlobalContext, TaskProps } from '../contexts/Tasks';
import { useContext } from 'react';

export function TaskList() {
  const { taskList } = useContext(GlobalContext);

  if (taskList.length > 0) {
    return (
      <div className="container mt-4">
        {taskList.map((task: TaskProps, i: number) => {
          return (
            <Task
              key={i}
              taskId={task.id}
              task={task.task}
              isDone={task.isDone}
            />
          );
        })}
      </div>
    );
  } else {
    return <NoTask />;
  }
}
