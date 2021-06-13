import {useState} from 'react';
import {Link} from 'react-router-dom'


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function loginUser(e){
        e.preventDefault();
        const result = await fetch(`${window.location.protocol}//${window.location.host}/api/user/login`, {
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
            <div className="min-h-screen min-w-full">
            {/* Navbar */}
            <div className="bg-green-900 ">
                <nav className="flex flex-row py-4 px-3 cursive font-bold items-center text-center">
                    <div className="bg-white py-1 px-4 rounded mr-auto header-btn">
                        <Link to="/">Home</Link>
                    </div>
 
                    <div className="text-white text-xl sm:text-2xl mx-auto text-center">
                        Expense Tracker
                    </div>
                    <div className="bg-white py-1 px-2 rounded ml-auto header-btn text-black">
                        <Link to="/welcome" className="">Back</Link>
                    </div>
                </nav>
            </div>
            {/* Main */}
            <div className="flex flex-col content-center items-center rounded sm:bg-gray-200 my-20 sm:mx-48">
                <div className="flex flex-col content-center items-center rounded bg-gray-200 sm:my-20 sm:mx-48">
                    <div className="my-10">
                        <div className="flex flex-col items-center content-center regular">
                            <div className="text-3xl py-10 font-bold">Log in</div>
                                <div className="flex flex-col items-center content-center">
                                    <input 
                                        type="text" 
                                        value={email} 
                                        onChange={onChangeEmail}
                                        placeholder="email" 
                                        className="rounded mb-5 py-1 px-2 mx-2 sm:mx-0" 
                                        />
                                    <input 
                                        type="text" 
                                        value={password} 
                                        onChange={onChangePassword} 
                                        placeholder="password"
                                        className="rounded mb-10 py-1 px-2 mx-2 sm:mx-0"
                                        />
                                    <button 
                                        onClick={loginUser}
                                        className="bg-green-700 px-2 py-1 rounded text-white font-bold mb-10 header-btn"
                                        >
                                            Log in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}