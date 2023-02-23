import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center relative">
      <div className="w-full h-[200px] bg-[#0D0D0D] flex items-center justify-center">
        <img src="/todo.svg" />
      </div>

      <section className="absolute top-[172px] flex gap-x-4 container">
        <input
          type="text"
          placeholder="Adicione uma nova tarefa"
          className="w-full rounded-md bg-[#262626] px-4 py-2 outline-none focus:border-2 focus:border-[#8284FA]"
        />
        <button className="bg-[#1E6F9F] px-2 py-4 rounded-lg w-24 font-semibold text-white hover:bg-[#4EA8DE]">
          Criar +
        </button>
      </section>

      <section className="container mt-16">
        <div className="w-full flex relative pb-4 border-b-2 border-[#333] font-semibold text-[#8284FA]">
          <h2 className="justify-start">Tarefas criadas</h2>

          <h2 className="absolute right-0">Concluídas</h2>
        </div>
      </section>
    </div>
  );
}

export default App;
