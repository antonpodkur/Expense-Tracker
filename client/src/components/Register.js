import {useState} from 'react';


export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(e){
        e.preventDefault();
        const result = await fetch('http://localhost:3000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email,password})
        })
        const res = await result.json();
        console.log(result);

        if(res.status === 'ok'){
            
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
            <h1>Registration</h1>
            <form>
                <input type="text" value={email} onChange={onChangeEmail} placeholder="email"/>
                <input type="text" value={password} onChange={onChangePassword} placeholder="password"/>
                <button onClick={registerUser}>Register</button>
            </form>
        </div>
    );
}