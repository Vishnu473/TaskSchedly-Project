import axios from 'axios';

export const getTasks = async(status) =>  {
    try {
        const url = `https://taskschedly-project.onrender.com/api/todo?selectedStatus=${status}`;
        const res = await axios.get(url);
        if(!res.data.success){
          throw new Error(res.data.message);
        }
        return res.data;
      } catch (error) {
        throw error;
      }
}