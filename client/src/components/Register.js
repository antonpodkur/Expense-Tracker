import {useState} from 'react';
import {Link} from 'react-router-dom'


export default function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(e){
        e.preventDefault();
        const result = await fetch(`${window.location.protocol}//${window.location.host}/api/user/register`, {
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
        <div className="flex flex-col items-center content-center regular">
            <div className="text-3xl py-10 font-bold">Registration</div>
            <div className="flex flex-col items-center content-center">
                <input 
                    type="text" 
                    value={email} 
                    onChange={onChangeEmail}
                    placeholder="email" 
                    className="rounded mb-5 py-1 px-2" 
                    />
                <input 
                    type="text" 
                    value={password} 
                    onChange={onChangePassword} 
                    placeholder="password"
                    className="rounded mb-10 py-1 px-2"
                    />
                <button 
                    onClick={registerUser}
                    className="bg-green-700 px-2 py-1 rounded text-white font-bold mb-10"
                    >
                        Register
                </button>
            </div>
        </div>
    );
}