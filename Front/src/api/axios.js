import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
}
)

//{sameSite: 'none', secure: true,httpOnly: false, }

export default instance; 