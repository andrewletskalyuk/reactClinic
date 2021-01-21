import axios from 'axios';

export default function setAuthorisationToken(token){
    if(token){
        axios.defaults.headers.common['Authorization'] = 'Bearer ${token}';
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

//приймаємо токен і зберігаємо ці дані, якщо буде другий - видаляємо його.