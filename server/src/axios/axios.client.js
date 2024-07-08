import axios from "axios";

const get = async (url) => {
  try{
    const response = await axios.get(url, {
      headers: {
        "Accept": "application/json",
        "Accept-Encoding": "identity"
      }
    });
    return response.data;
  }
  catch(e){
    console.log(e);
  }
};

export default { get };