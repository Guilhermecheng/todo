import { useQuery } from '@apollo/client';
import { GET_TODOS } from '../queries/queries';
import { NoTask } from './NoTask';
import { Task } from './Task';

export function TaskList() {
  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  if (loading)
    return <div className="text-white font-semibold">Loading...</div>;
  if (error) return <div className="text-white font-semibold">Error!</div>;

  return (
    <>
      {data.tasks && data.tasks.length > 0 ? (
        <div className="container mt-4">
          {data.tasks.map((task: any, i: number) => {
            return (
              <Task
                key={i}
                id={task.id}
                task={task.taskDescription}
                isDone={task.isTaskDone}
                refetch={refetch}
              />
            );
          })}
        </div>
      ) : (
        <NoTask />
      )}
    </>
  );
}
