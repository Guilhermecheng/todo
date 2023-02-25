import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';
import { HiOutlineTrash } from 'react-icons/hi';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { GlobalContext, TaskProps } from '../contexts/Tasks';

interface TaskCompProps extends TaskProps {
  setCount: Dispatch<SetStateAction<number>>;
  setTotalCount: Dispatch<SetStateAction<number>>;
}

export function Task({
  task,
  id,
  isDone,
  setCount,
  setTotalCount,
}: TaskCompProps) {
  const { taskList, setTaskList } = useContext(GlobalContext);
  const [taskState, setTaskState] = useState(isDone);

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
