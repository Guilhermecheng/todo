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
}

export const GlobalContext = createContext<GlobalContextProps>({
  taskList: [],
  setTaskList: () => {},
});

export const Contexts = (props: any) => {
  const [taskList, setTaskList] = useState<TaskProps[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        taskList,
        setTaskList,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
