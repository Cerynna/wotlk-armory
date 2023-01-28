import axios from "axios";

export async function getBossByTag(tag: string) {
  let response = await axios.get(`http://localhost:5000/boss/${tag}`);
  return response.data;
}
