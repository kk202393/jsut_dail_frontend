import { error } from "console";
import url from "./urls";

export async function loginUser(loginInfo: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(url.LOGIN_URL, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.massage || "Login failed");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function registerUser(loginInfo: {
  email: string;
  password: string;
}) {
  try {
    const response = await fetch(url.REGISTRATION_URL, {
      method: "POST",
      body: JSON.stringify(loginInfo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.massage || "Login failed");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

