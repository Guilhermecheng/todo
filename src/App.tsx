import { useContext, useEffect, useRef, useState } from 'react';
import uuid from 'react-uuid';

import client from './services/apolloClient';
import { gql } from '@apollo/client';

import { HiOutlinePlusCircle } from 'react-icons/hi';
import { GlobalContext, TaskProps } from './contexts/Tasks';
import { Task } from './components/Task';
import { NoTask } from './components/NoTask';

function App() {
  const { taskList, setTaskList } = useContext(GlobalContext);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState('');
  const [count, setCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [apiResp, setApiResp] = useState();

  function saveNewTaskToList() {
    if (input !== '') {
      let newList = taskList;
      newList.push({
        id: uuid(),
        task: input,
        isDone: false,
      });
      // @ts-ignore
      inputRef.current.value = '';
      setInput('');
      setTaskList(newList);
      let counter = isDoneCount();
      setCount(counter);
      setTotalCount(taskList.length);
    }
  }

  function isDoneCount() {
    let counter = 0;
    taskList.filter((current: TaskProps) => {
      if (current.isDone) {
        counter++;
      }
    });
    return counter;
  }

  function onKeySubmit(event: any) {
    if (
      (event.code === 'Enter' || event.code === 'NumpadEnter') &&
      event.target.id === 'inputText'
    ) {
      saveNewTaskToList();
    }
  }

  useEffect(() => {
    try {
      client
        .query({
          query: gql`
          query Tasks {
            tasks(orderBy: createdAt_DESC) {
              createdAt
              id
              isTaskDone
              publishedAt
              taskDescription
              updatedAt
            }
          }`,
          context: {
            headers: {
              Authorization: `Bearer ${
                import.meta.env.VITE_HYGRAPH_TOKEN as string
              }`,
            },
          },
        })
        .then((response) => {
          // console.log(response.data.tasks);
          return response.data.tasks;
        })
        .then((data) => {
          console.log(data);
          setApiResp(data);
          console.log(apiResp);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full h-[200px] bg-[#0D0D0D] flex items-center justify-center">
        <img src="/todo.svg" />
      </div>

      <section className="absolute top-[172px] flex gap-x-4 container">
        <input
          type="text"
          id="inputText"
          ref={inputRef}
          placeholder="Adicione uma nova tarefa"
          className="w-full rounded-md bg-[#262626] px-4 py-2 text-white outline-none focus:border-2 focus:border-[#8284FA]"
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => onKeySubmit(e)}
        />
        <button
          onClick={saveNewTaskToList}
          className="bg-[#1E6F9F] px-4 py-4 rounded-lg w-24 font-base font-semibold flex flex-nowrap items-center gap-x-2 text-white hover:bg-[#4EA8DE]"
        >
          Criar <HiOutlinePlusCircle size={20} />
        </button>
      </section>

      <section className="container mt-20">
        <div className="w-full flex relative font-semibold text-[#8284FA]">
          <h2 className="justify-start">
            Tarefas criadas{' '}
            <span className="text-white bg-gray-600 rounded-lg px-2 ml-2">
              {totalCount}
            </span>
          </h2>

          <h2 className="absolute right-0">
            Concluídas{' '}
            <span className="text-white bg-gray-600 rounded-lg px-2 ml-2">
              {count} de {totalCount}
            </span>
          </h2>
        </div>
      </section>

      {apiResp.length > 0 ? (
        <div className="container mt-4">
          {/* {taskList.map((task: TaskProps, i: number) => {
            return (
              <Task
                key={i}
                id={task.id}
                task={task.task}
                isDone={task.isDone}
                setCount={setCount}
                setTotalCount={setTotalCount}
              />
            );
          })} */}

          {apiResp.map((task: any, i: number) => {
            return (
              <Task
                key={i}
                id={task.id}
                task={task.taskDescription}
                isDone={task.isTaskDone}
                setCount={setCount}
                setTotalCount={setTotalCount}
              />
            );
          })}
        </div>
      ) : (
        <NoTask />
      )}
    </div>
  );
}

export default App;
