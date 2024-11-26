import { singinSingupFormSchema } from "@/lib/schema";

export type SignupState = {
  errors: {
    email?: string[];
    name?: string[];
  };
};
export type FormDataLike = {
  get(key: string): FormDataEntryValue | null;
};


export async function signin(
  state: SignupState,
  formData: FormDataLike,
  isSignup: boolean
): Promise<SignupState> {
  const email = formData.get("email") as string | null;

  const validationResult = singinSingupFormSchema(isSignup).safeParse({
    email: email ?? "",
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email: validEmail } = validationResult.data;

  try {
    const response = await fetch("http://localhost:3005/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: validEmail }),
    });

    if (!response.ok) {
      return {
        errors: { email: ["Login failed. Please try again."] },
      };
    }

    const responseData = await response.json();

    return {
      errors: {},
    };
  } catch (err) {
    console.error("Error during login:", err);
    return {
      errors: { email: ["Unexpected error occurred. Please try again."] },
    };
  }
}

export async function signup(
  state: SignupState,
  formData: FormDataLike,
  isSignup: boolean
): Promise<SignupState> {
  const email = formData.get("email") as string | null;
  const name = formData.get("name") as string | null;

  const validationResult = singinSingupFormSchema(isSignup).safeParse({
    email: email ?? "",
    name: name ?? "",
  });

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    };
  }

  const { email: validEmail, name: validName } = validationResult.data;

  try {
    const response = await fetch("http://localhost:3005/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: validEmail, name: validName }),
    });

    if (!response.ok) {
      return {
        errors: { email: ["Sign-up failed. Please try again."] },
      };
    }

    return {
      errors: {},
    };
  } catch (err) {
    console.error("Error during signup:", err);
    return {
      errors: { email: ["Unexpected error occurred. Please try again."] },
    };
  }
}
