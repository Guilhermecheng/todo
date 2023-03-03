import { useQuery, gql } from '@apollo/client';
import { NoTask } from './NoTask';
import { Task } from './Task';

interface TaskListProps {
  setCount: () => void;
  setTotalCount: () => void;
}

export function TaskList({ setCount, setTotalCount }: TaskListProps) {
  const GET_TODOS = gql`
  query GetTasks {
    tasks {
      createdAt
      id
      isTaskDone
      publishedAt
      taskDescription
      updatedAt
    }
  }
`;

  const { loading, error, data, refetch } = useQuery(GET_TODOS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error!</div>;

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
                setCount={setCount}
                setTotalCount={setTotalCount}
                // @ts-ignore
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
