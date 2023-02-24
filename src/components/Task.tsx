import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { HiOutlineTrash } from 'react-icons/hi';
import { useContext, useState } from 'react';
import { GlobalContext, TaskProps } from '../contexts/Tasks';

interface TaskCompProps extends TaskProps {
  taskId?: string;
}

export function Task({ task, id, isDone }: TaskProps) {
  const { taskList, setTaskList, isDoneCount, count, setCount } =
    useContext(GlobalContext);
  const [taskState, setTaskState] = useState(isDone);

  function getTaskDone(id: string) {
    let list = taskList;
    let itemIndex = taskList.findIndex((x) => x.id === id);

    list[itemIndex] = {
      id,
      task,
      isDone: !isDone,
    };
    setTaskList((taskList) => [...taskList, ...list]);
    setTaskState(!taskState);
    let counter = isDoneCount();
    setCount(counter);
  }

  function deleteTask(id: string) {
    let itemIndex = taskList.findIndex((x) => x.id === id);
    let newList = taskList.splice(itemIndex, 1);
    setTaskList((taskList) => [...taskList, ...newList]);
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
      <span className="pl-4">{task}</span>
      <HiOutlineTrash
        size={20}
        className="absolute right-4 cursor-pointer text-gray-500 hover:text-gray-100"
        onClick={() => deleteTask(id)}
      />
    </div>
  );
}
