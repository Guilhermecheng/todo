export function NoTask() {
  return (
    <div className=" flex flex-col items-center justify-center py-20  border-t-2 border-[#333] mt-4 container w-[90%] tablet:w-full">
      <img src="/clipboard.svg" alt="no tasks" />

      <div className="text-[#808080] flex flex-col mt-2 ">
        <span className="font-semibold">
          Você ainda não tem tarefas cadastradas
        </span>
        <span>Crie tarefas e organize seus items a fazer</span>
      </div>
    </div>
  );
}
