export interface RegisterPayload {
  name: string
  email: string
  phone: string
  password: string
  password_confirmation: string
}

const RegisterUser = async (data: RegisterPayload) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/auth/register";
  
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    })

    
    const result = await response.json()
    return result
  } catch (error: unknown) {
    console.error("Register API Error:", error)
    throw new Error("Unknown error occurred while registering user")
  }
}
export default RegisterUser




// Login User API Service
export interface LoginPayload {
  email_or_phone: string
  password: string
}
export const loginUser = async (data: LoginPayload) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL + "/auth/login";
  try {
    const res = await fetch(BASE_URL, {
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
    }else{
      throw new Error("Unknown error occurred while fetching login user");
    }
  }
};
