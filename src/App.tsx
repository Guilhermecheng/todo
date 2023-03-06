import { useEffect, useRef, useState } from 'react';

import { useQuery, useMutation } from '@apollo/client';
import { GET_TODOS, CREATE_TODO } from './queries/queries';

import { HiOutlinePlusCircle } from 'react-icons/hi';
import { TaskList } from './components/TaskList';

function App() {
  const { data, refetch } = useQuery(GET_TODOS);
  const [createTask, { error }] = useMutation(CREATE_TODO);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState('');
  const [concludedCount, setConcludedCount] = useState<number>(0);

  function saveNewTaskToList() {
    if (input !== '') {
      createTask({
        variables: {
          task: input,
          isTaskDone: false,
        },
        onCompleted: () => refetch(),
      });
      // @ts-ignore
      inputRef.current.value = '';
      setInput('');
    }
  }

  function isDoneCount() {
    if (data) {
      let counter = 0;
      console.log(data.tasks);
      data.tasks.filter((current: any) => {
        if (current.isTaskDone) {
          console.log('conta essa porra');
          counter++;
        }
      });
      console.log(counter);
      setConcludedCount(counter);
    } else {
      setConcludedCount(0);
    }
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
    isDoneCount();
  }, [data]);

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
          onClick={() => saveNewTaskToList()}
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
              {data ? data.tasks.length : 0}
            </span>
          </h2>

          <h2 className="absolute right-0">
            Concluídas{' '}
            <span className="text-white bg-gray-600 rounded-lg px-2 ml-2">
              {concludedCount} de {data ? data.tasks.length : 0}
            </span>
          </h2>
        </div>
      </section>

      <TaskList />
    </div>
  );
}

export default App;
