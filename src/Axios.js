import axios from 'axios';

const users = axios.create({
  baseURL:
    "https://instagram-8a4cf-default-rtdb.europe-west1.firebasedatabase.app/users",
});



export {
    users,    
}