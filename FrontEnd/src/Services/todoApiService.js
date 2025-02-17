import axios from "axios";

export const getTasks = async (status) => {
  try {
    // const url = `https://taskschedly-project.onrender.com/api/todo?selectedStatus=${status}`;
    const url =`https://taskschedly-project.onrender.com/api/tasks?taskStatus=${status}`
    const res = await axios.get(url);
    if (!res.data.success) {
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (task) => {
  try {
    const url = "https://taskschedly-project.onrender.com/api/tasks/add";
    const res = await axios.post(url, task, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if(!res.data.success){
      throw new Error(res.data.message);
    }
    return res.data;
  }catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

export const deleteTask = async (id) => {
  try {
    const url = `https://taskschedly-project.onrender.com/api/tasks/delete/${id}`;
    const res = await axios.post(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("From Service",res.data);
    if(!res.data.success){
      throw new Error(res.data.message);
    }
    return res.data;
  } catch (error) {
    
    throw new Error(error.message);
  }
};
