import {useState} from 'react';
import {Link} from 'react-router-dom';

export default function ChangePassword() {
    const [password, setPassword] = useState('');

    async function loginUser(e){
        e.preventDefault();
        const result = await fetch(`${window.location.protocol}//${window.location.host}/api/user/change-password`, {
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
                        <div className="bg-green-900 text-green-900 py-1 px-2 rounded ml-auto header-btn text-black">
                            Back
                        </div>
                    </nav>
                </div>
                {/* Main */}
                <div className="flex flex-col content-center items-center rounded sm:bg-gray-200 my-20 sm:mx-48">
                    <div className="flex flex-col content-center items-center rounded bg-gray-200 sm:my-20 sm:mx-48">
                        <div className="my-10">
                            <div className="flex flex-col items-center content-center regular">
                                <div className="text-2xl lg:text-3xl py-10 font-bold">Create a new password</div>
                                    <div className="flex flex-col items-center content-center">
                                        <input 
                                            type="text" 
                                            value={password} 
                                            onChange={onChangePassword} 
                                            placeholder="new password"
                                            className="rounded mb-10 py-1 px-2 mx-2 sm:mx-0"
                                            />
                                        <button 
                                            onClick={loginUser}
                                            className="bg-green-700 px-2 py-1 rounded text-white font-bold mb-10 header-btn"
                                            >
                                                <Link to="/">Change</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}