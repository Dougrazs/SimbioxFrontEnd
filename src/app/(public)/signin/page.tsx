'use client';

import { Input } from "@/components";
import { signin, signup, SignupState, FormDataLike } from './actions';
import { useActionState } from 'react';
import { useSignin } from "./useSignin";
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components';
import { useState } from 'react';

const initialState = {
  errors: {
    email: undefined,
    name: undefined,
  },
};

export default function SignIn() {
  const { loading, handleIsSignup, isSignup } = useSignin();
  const router = useRouter();

  const [generalFeedback, setGeneralFeedback] = useState<string | null>(null); // For success or general messages.
  const [state, action,] = useActionState<SignupState, FormDataLike>(
    async (state, formData) => {
      const result = isSignup
        ? await signup(state, formData, isSignup)
        : await signin(state, formData, isSignup);

      if (!result.errors || Object.keys(result.errors).length === 0) {
        setGeneralFeedback(isSignup ? "Conta criada com sucesso, verifique seu e-mail!" : "Se o email estiver registrado, você receberá um link para login");
        setTimeout(() => router.push('/destaques'), 2000);
      } else {
        setGeneralFeedback(null);
      }

      return result;
    },
    initialState
  );

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <form action={action} className="w-100 h-100 items-center bg-purpleBg p-8 rounded-md m-auto flex flex-col gap-5 transition-3s">
        <div className="flex flex-col items-center align-center gap-10">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <Input id="email" name="email" placeholder="Email@email.com" />
            </div>
            {state.errors.email && <p className="text-red-500">{state.errors.email.join(", ")}</p>}
            {isSignup && (
              <>
                <div className="flex flex-col">
                  <label htmlFor="name">Name</label>
                  <Input id="name" name="name" placeholder="Your Name" />
                </div>
                {state.errors.name && <p className="text-red-500">{state.errors.name.join(", ")}</p>}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center gap-8">
          <button type="submit">{isSignup ? "Cadastrar" : "Entrar"}</button>
          {!isSignup && <h4>ou crie um cadastro</h4>}
          <button type="button" onClick={handleIsSignup}>
            {isSignup ? "Voltar para tela de login" : "Cadastro"}
          </button>
        </div>
        {generalFeedback && (
          <div className="mt-4 text-center">
            <p className="text-green-500">{generalFeedback}</p>
          </div>
        )}
      </form>
    </div>
  );
}
