'use client'
import { useConta } from "./useConta";

export default function MinhaConta() {


  const { handleDeleteAccount, handleLogout, handleUpdate, handleInputChange, form } = useConta();

  return (
    <form className={'w-full bg-purpleBg flex flex-col items-center p-5 rounded-md gap-10'}>
      <div className={'flex flex-col'}>
        <label htmlFor='nameInput'>Nome do usuário</label>
        <input
          id={'nameInput'}
          name='name'
          className={'font-semibold text-black p-5 rounded-md'}
          value={form?.name}
          onChange={handleInputChange}
        />
      </div>

      <div className={'flex flex-col'}>
        <label htmlFor='emailInput'>E-mail</label>
        <input
          disabled={true}
          id={'emailInput'}
          className={'font-semibold text-black p-5 rounded-md select-none drag-none'}
          defaultValue={form?.email}
        />
      </div>

      <button
        type='button'
        onClick={handleUpdate}
        className={'bg-white text-black font-semibold rounded-md p-5'}
      >
        Atualizar Conta
      </button>

      <button
        type='button'
        onClick={handleLogout}
        className={'bg-white text-red-600 rounded-md p-5'}
      >
        Deslogar
      </button>

      <button
        type='button'
        onClick={handleDeleteAccount}
        className={'text-red-600 rounded-md p-5'}
      >
        Deletar Conta
      </button>
    </form>
  );
}
