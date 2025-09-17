import url from "./urls";

export function loginUser(loginInfo: { email: string; password: string }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response: any = await fetch(url.LOGIN_URL, {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "content-type": "application/json" },
      });

      if (response.success) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.json();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}
