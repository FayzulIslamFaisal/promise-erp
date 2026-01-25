const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/auth";
export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
}

const RegisterUser = async (data: RegisterPayload) => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error: unknown) {
    console.error("Register API Error:", error);
    throw new Error("Unknown error occurred while registering user");
  }
};
export default RegisterUser;

// Login User API Service
export interface LoginPayload {
  email_or_phone: string;
  password: string;
}
export const loginUser = async (data: LoginPayload) => {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await res.json();

    if (!responseData.success) {
      throw new Error(responseData.message || "Login failed");
    }

    return responseData.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login API Error:", error.message);
      throw error;
    } else {
      throw new Error("Unknown error occurred while fetching login user");
    }
  }
};
//End Login User API Service

// ====== Forgot Password API Service ======
interface ForgotPasswordResponse {
  success: boolean;
  message: string;
  code: number;
  data?: null;
  errors?: Record<string, string[] | string>;
}

export async function userForgotPasswordEmail(
  email: string,
): Promise<ForgotPasswordResponse> {
  const url = `${BASE_URL}/forgot-password`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data: ForgotPasswordResponse = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Forgot Password API Error:", error.message);
      throw error;
    } else {
      throw new Error("Unknown error occurred while sending reset email");
    }
  }
}

// ======End Forgot Password API Service ======

// ===== Reset Password API Service ======
export interface ResetPasswordResponse {
  success: boolean;
  message: string;
  code: number;
  data?: unknown;
  errors?: Record<string, string[] | string>;
}

export async function resetPassword(
  password : string,
  password_confirmation: string,
  resetToken: string
): Promise<ResetPasswordResponse> {
  const url = `${BASE_URL}/reset-password`;

  try {

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Reset-Token': resetToken,
        'X-CSRF-TOKEN': '',
      },
      body: JSON.stringify({ password, password_confirmation }),
    });

    const data: ResetPasswordResponse = await res.json();
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Reset Password API Error:', error.message);
      throw error;
    } else {
      throw new Error('Unknown error occurred while resetting password');
    }
  }
}
// ===== End Reset Password API Service ======