import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

export default function Statistics() {
    const [expenses, setExpenses] = useState([]);
    const [dateNow, setDateNow] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentExpenses, setCurrentExpenses] = useState([]);

    useEffect(()=>{
        getExpenses();
    },[]);

    function Logout(){
        localStorage.removeItem('token');
    }

    const getExpenses = async () => {
        const result = await fetch('http://localhost:3000/api/expense/getExpenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        token: localStorage.getItem('token')
                    }
                )
            })
        const res = await result.json();

        setExpenses(res.expenses.reverse());
        setDateNow(new Date());
        setCurrentWeek(getWeekNumber(new Date()));
        setCurrentExpenses(getCurrentExpenses(res.expenses.reverse()));

    }

    const getWeekNumber = (todayDate) => {
        if(dateNow.getFullYear() !== todayDate.getFullYear()) {
            console.log('dates1');
            console.log(dateNow.getFullYear());
            console.log(todayDate.getFullYear());
            return 0;
        } 
        const oneJan = new Date(dateNow.getFullYear(), 0, 1);
        const numberOfDays = Math.floor((todayDate - oneJan) / (24 * 60 * 60 * 1000));  
        const result = Math.ceil((todayDate.getDay()+1 + numberOfDays)/7);
        return result;
    }

    const isSameWeek = (date1) => (getWeekNumber(new Date(date1)) === getWeekNumber(new Date()));

    const getCurrentExpenses = (newExpenses) => {
        let tmp = [...newExpenses];

        tmp = tmp.filter(item => (
            isSameWeek(item.datetime)
        ));
        return tmp;
    }

    const getSpentTotal = () => {
        let num = 0;
        currentExpenses.map(item => num += item.amount);
        return num;
    }

    const getAmountOfDays = () => {
        let temp = [];
        currentExpenses.forEach(item => {
            const tempDate = `${new Date(item.datetime).getDate()}.${new Date(item.datetime).getMonth() + 1 }.${new Date(item.datetime).getFullYear()}`;
            if(!temp.includes(tempDate)){
                temp.push(tempDate);
            }
        })
        if (temp.length === 0) return 1;
        return temp.length;
    }

    return(
        <div>
            {/* Navbar */}
            <div className="bg-green-900">
                <nav className="flex flex-row py-4 px-3 cursive font-bold items-center text-center">
                    <div className="py-1 px-4 text-white text-xl sm:text-2xl mr-auto header-btn">
                        <Link to="/welcome" className="">Expense Tracker</Link>
                    </div>
                    <div className="bg-white py-1 px-2 rounded ml-auto header-btn text-center">
                        <Link to="/" className="">Home</Link>
                    </div>
                    <div className="bg-red-800 text-white py-1 px-2 rounded ml-4 header-btn text-center">
                        <Link to="/welcome" onClick={Logout}>Log out</Link>
                    </div>
                </nav>
            </div>
            <div className="mx-2 sm:mx-20 sm:my-20">
                <div className="flex flex-col items-center my-5 mx-15 py-5 rounded regular bg-gray-200">
                    <div className="font-bold text-2xl ">Expenses this week</div>
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>date</th>
                                <th>time</th>
                                <th>description</th>
                                <th>amount, $</th>
                                <th>comment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                currentExpenses && currentExpenses.map((expense, index) => (
                                        <tr key={index}>
                                            <td>{`${new Date(expense.datetime).getDate()}.${new Date(expense.datetime).getMonth() + 1 }.${new Date(expense.datetime).getFullYear()}`}</td>
                                            <td>{`${new Date(expense.datetime).getHours()}:${new Date(expense.datetime).getMinutes()}`}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.amount}</td>
                                            <td>{expense.comment}</td>
                                        </tr>
                                    )
                                    
                                )
                            }
                        </tbody>
                    </table>
                    <div className="flex flex-col items-center my-5 text-xl">
                        <h2>Total spent this week</h2>
                        <h3 className="font-bold">{getSpentTotal() + "$"}</h3>
                    </div>
                    <div className="flex flex-col items-center my-5 text-xl">
                        <h2>Average day spending</h2>
                        <h3 className="font-bold">{getSpentTotal()/getAmountOfDays() + "$"}</h3>
                    </div>
                </div>
            </div>
    
        </div>
    );
}