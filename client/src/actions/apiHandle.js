import axios from "axios";

const URL = process.env.REACT_APP_SERVER;

export async function sendPost(route, body) {
  console.log("route", route);
  try {
    const res = await axios.post(URL + route, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return "err";
  }
}
export async function sendDelete(route) {
  try {
    const res = await axios.delete(URL + route, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return "err";
  }
}
export async function sendUpdate(route, body) {
  try {
    const res = await axios.put(URL + route, body, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return "err";
  }
}

export async function sendGet(route) {
  try {
    const res = await axios.get(URL + route, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
    return "err";
  }
}
