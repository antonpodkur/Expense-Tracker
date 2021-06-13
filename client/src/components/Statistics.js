import {useState, useEffect} from 'react';

export default function Statistics() {
    const [expenses, setExpenses] = useState([]);
    const [dateNow, setDateNow] = useState(new Date());
    const [currentWeek, setCurrentWeek] = useState(0);
    const [currentExpenses, setCurrentExpenses] = useState([]);

    useEffect(()=>{
        getExpenses();
    },[]);

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

    return(
        <div>
            <h1>Statistics</h1>
            <div>
                <h2>Expenses this week</h2>
                <table>
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
            </div>
            <div>
                <h2>Total spent this week</h2>
                <h3>{getSpentTotal()}</h3>
            </div>
            <div>
                <h2>Average day spending</h2>
                <h3>{getSpentTotal()/currentExpenses.length}</h3>
            </div>
        </div>
    );
}