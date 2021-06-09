import {useState} from 'react';
import {Link} from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(e){
        e.preventDefault();
        const result = await fetch('http://localhost:3000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        const res = await result.json();
        console.log(result);

        if(res.status === 'ok'){
            console.log('Got the token: ', res.data);
            localStorage.setItem('token', res.data);
        }else {
            alert(res.error);
        }
    }

    function onChangeEmail(e){
        setEmail(e.target.value);
    }

    function onChangePassword(e){
        setPassword(e.target.value);
    }

    return(
        <div>
            <h1>Login</h1>
            <form>
                <input type="text" value={email} onChange={onChangeEmail} placeholder="email"/>
                <input type="text" value={password} onChange={onChangePassword} placeholder="password"/>
                <button onClick={loginUser}>Register</button>
            </form>
            <p>Don`t have an account? Create it!</p>
            <Link to="/register">Sign Up</Link>
        </div>
    );
}