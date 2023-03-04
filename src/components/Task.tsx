import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { HiOutlineTrash } from 'react-icons/hi';
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { GlobalContext, TaskProps } from '../contexts/Tasks';
import { gql, useMutation, useQuery } from '@apollo/client';
import { DELETE_TASK } from '../queries/queries';

interface TaskCompProps extends TaskProps {
  setCount: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
  refetch: () => void;
}

export function Task({
  task,
  id,
  isDone,
  setCount,
  setTotalCount,
  refetch,
}: TaskCompProps) {
  const { taskList, setTaskList } = useContext(GlobalContext);
  const [taskState, setTaskState] = useState(isDone);

  const MARK_TODO_STATE = gql`
    mutation UpdateTask($id:ID!, $isTaskDone: Boolean!) {
      updateTask(where: {
        id: $id
      },
      data: {
        isTaskDone: $isTaskDone
      }
      ) {
        id
        taskDescription
        isTaskDone
      } 
    }
  `;
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

  function isDoneCount() {
    let counter = 0;
    taskList.filter((current: TaskProps) => {
      if (current.isDone) {
        counter++;
      }
    });
    return counter;
  }

  function getTaskDone(id: string) {
    console.log(id);
    markTodoState({
      variables: { id, isTaskDone: true },
    });
    let list = taskList;
    let itemIndex = taskList.findIndex((x) => x.id === id);

    list[itemIndex] = {
      id,
      task,
      isDone: !isDone,
    };
    setTaskList((taskList) => [...taskList, ...list]);
    // console.log(taskList);
    setTaskState(!taskState);
    let counter = isDoneCount();
    setCount(counter);
  }

  function deleteTask(id: string) {
    deleteTaskMutation({ variables: { id } });
    let itemIndex = taskList.findIndex((x) => x.id === id);
    let newList = taskList.splice(itemIndex, 1);
    setTaskList((taskList) => [...taskList, ...newList]);
    // console.log(taskList);

    let counter = isDoneCount();
    setCount(counter);
    setTotalCount(taskList.length);
  }

  return (
    <div className="relative px-4 py-4 bg-[#262626] flex flex-row text-white items-center rounded-md mb-4">
      {taskState ? (
        <IoCheckmarkCircleSharp
          onClick={() => getTaskDone(id)}
          size={20}
          className="text-purple-400"
        />
      ) : (
        <MdOutlineRadioButtonUnchecked
          size={20}
          className="text-blue-400 cursor-pointer hover:text-purple-400"
          onClick={() => getTaskDone(id)}
        />
      )}
      <span className={`pl-4 ${taskState && 'text-gray-500 line-through'}`}>
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
