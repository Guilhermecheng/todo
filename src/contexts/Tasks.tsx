import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

export interface TaskProps {
  id: string;
  task: string;
  isDone: boolean;
}

interface GlobalContextProps {
  taskList: TaskProps[];
  setTaskList: Dispatch<SetStateAction<TaskProps[]>>;
  isDoneCount: () => number;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
}

export const GlobalContext = createContext<GlobalContextProps>({
  taskList: [],
  setTaskList: () => {},
  isDoneCount: () => 0,
  count: 0,
  setCount: () => {},
});

export const Contexts = (props: any) => {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);
  const [count, setCount] = useState(0);

  function isDoneCount() {
    let counter = 0;
    taskList.filter((current: TaskProps) => {
      if (current.isDone) {
        counter++;
      }
    });
    return counter;
  }

  return (
    <GlobalContext.Provider
      value={{
        taskList,
        setTaskList,
        isDoneCount,
        count,
        setCount,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
