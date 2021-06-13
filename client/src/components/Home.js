import AddExpense from './AddExpense';
import AllExpenses from './AllExpenses';
import {Link} from 'react-router-dom';

export default function Home(){

    function Logout(){
        localStorage.removeItem('token');
    }
    
    
    return(
        <div className="min-h-screen min-w-full">
            {/* Navbar */}
            <div className="bg-green-900">
                <nav className="flex flex-row py-4 px-3 cursive font-bold items-center text-center">
                    <div className="py-1 px-4 text-white text-xl sm:text-2xl mr-auto header-btn">
                        <Link to="/welcome" className="">Expense Tracker</Link>
                    </div>
                    <div className="bg-white py-1 px-2 rounded ml-auto header-btn text-center">
                        <Link to="/statistics" className="">Statistics</Link>
                    </div>
                    {/* <div className="bg-white py-1 px-2 rounded ml-4 header-btn text-center">
                        <Link to="/change-password">Change password</Link>
                    </div> */}
                    <div className="bg-red-800 text-white py-1 px-2 rounded ml-4 header-btn text-center">
                        <Link to="/welcome" onClick={Logout}>Log out</Link>
                    </div>
                </nav>
            </div>
            <div className="mx-2 sm:mx-5 lg:mx-10 my-2 sm:my-3 lg:my-5">
                <AddExpense></AddExpense>
                <AllExpenses></AllExpenses>
            </div>
        </div>
    );
}