import { z } from "zod";
export const singinSingupFormSchema = (isSignUp: boolean) => {
  console.log('SCHEMA: ', { isSignUp })
  return z.object({
    email: z
      .string()
      .email({ message: "Endereço de e-mail inválido" })
      .min(1, { message: "O e-mail é obrigatório" }),

    name: isSignUp
      ? z
        .string()
        .min(2, { message: "O nome deve ter pelo menos 2 caracteres" })
        .max(50, { message: "O nome deve ter no máximo 50 caracteres" })
      : z.string().optional(),
  });
};