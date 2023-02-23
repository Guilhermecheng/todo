import { MdOutlineRadioButtonUnchecked } from 'react-icons/md';
import { IoCheckmarkCircleSharp } from 'react-icons/io5';

export interface TaskProps {
  task: string;
  isDone: boolean;
}

export function Task({ task, isDone }: TaskProps) {
  if (isDone) {
    return (
      <div className=" px-4 py-6 bg-[#262626] flex flex-row text-white items-center rounded-md mb-4">
        <IoCheckmarkCircleSharp size={20} className="text-purple-400" />
        <span className="pl-4">{task}</span>
      </div>
    );
  } else {
    return (
      <div className=" px-4 py-6 bg-[#262626] flex flex-row text-white items-center rounded-md mb-4">
        <MdOutlineRadioButtonUnchecked size={20} className="text-purple-400" />
        <span className="pl-4">{task}</span>
      </div>
    );
  }
}
