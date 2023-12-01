export const setToken = (token: string) =>
  sessionStorage.setItem("token", token);

export const getToken = () => sessionStorage.getItem("token");

export const removeToken = () => sessionStorage.removeItem("token");

export const serverUrl = "http://localhost:1337";

export const dalImg = (url: string | undefined) => {
  if (url) {
    if (url.startsWith("http")) return url;
    return serverUrl + url;
  }
  return "https://patchwiki.biligame.com/images/ys/0/0a/7bpzoigphsck8n51qlxiwcwgtq6q6oc.png";
};
