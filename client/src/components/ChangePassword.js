import {useState} from 'react';

export default function ChangePassword() {
    const [password, setPassword] = useState('');

    async function loginUser(e){
        e.preventDefault();
        const result = await fetch('http://localhost:3000/api/user/change-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    password: password,
                    token: localStorage.getItem('token')
                }
            )
        })
        const res = await result.json();
        console.log(result);

        if(res.status === 'ok'){
        }else {
            alert(res.error);
        }
    }

    function onChangePassword(e){
        setPassword(e.target.value);
    }

    return(
        <div>
            <h1>Change Password</h1>
            <form>
                <input type="text" value={password} onChange={onChangePassword} placeholder="new password"/>
                <button onClick={loginUser}>Submit</button>
            </form>
        </div>
    );
}