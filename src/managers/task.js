import axios from "axios";

const allTasks = async () => {
  const fetchData = await axios.get("api/frontend-task-data.json");

  if (fetchData.status != 200) throw Error("data is not accessible");
  return fetchData.data;
};

const addTask = () => {};

export default { allTasks, addTask };
