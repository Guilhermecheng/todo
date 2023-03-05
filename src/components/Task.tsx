import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { HiOutlineTrash } from 'react-icons/hi';
import { useEffect } from 'react';
import { TaskProps } from '../contexts/Tasks';
import { useMutation } from '@apollo/client';
import { MARK_TODO_STATE, DELETE_TASK } from '../queries/queries';

interface TaskCompProps extends TaskProps {
  refetch: () => void;
}

export function Task({ task, id, isDone, refetch }: TaskCompProps) {
  const [markTodoState, { data, loading, error }] = useMutation(
    MARK_TODO_STATE,
    {
      onCompleted: () => refetch(),
    }
  );

  const [
    deleteTaskMutation,
    {
      data: deleteTaskData,
      loading: deleteTaskLoading,
      error: deleteTaskError,
    },
  ] = useMutation(DELETE_TASK, {
    onCompleted: () => refetch(),
  });

  useEffect(() => {
    console.log(error);
    if (error) {
      console.log(error.message);
    }
  }, [error, loading, data]);

  function getTaskDone(id: string, isTaskDone: boolean) {
    markTodoState({
      variables: { id, isTaskDone: !isTaskDone },
    });
  }

  function deleteTask(id: string) {
    deleteTaskMutation({ variables: { id } });
  }

  return (
    <div className="relative px-4 py-4 bg-[#262626] flex flex-row text-white items-center rounded-md mb-4">
      {isDone ? (
        <IoCheckmarkCircleSharp
          onClick={() => getTaskDone(id, isDone)}
          size={20}
          className="text-purple-400"
        />
      ) : (
        <MdOutlineRadioButtonUnchecked
          size={20}
          className="text-blue-400 cursor-pointer hover:text-purple-400"
          onClick={() => getTaskDone(id, isDone)}
        />
      )}
      <span className={`pl-4 ${isDone && 'text-gray-500 line-through'}`}>
        {task}
      </span>
      <HiOutlineTrash
        size={20}
        className="absolute right-4 cursor-pointer text-gray-500 hover:text-gray-100"
        onClick={() => deleteTask(id)}
      />
    </div>
  );
}
