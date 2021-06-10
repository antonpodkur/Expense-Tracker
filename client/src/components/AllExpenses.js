import {useState, useEffect} from 'react';

export default function AllExpenses(){
    const [expenses, setExpenses] = useState([]);

    useEffect(()=>{
        ( async () => {
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
            console.log(res.expenses);
            setExpenses(res.expenses);
            
        })();
    },[]);

    return(
        <div>
            <h1>All expenses</h1>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>date</th>
                            <th>time</th>
                            <th>description</th>
                            <th>amount</th>
                            <th>comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses && expenses.map((expense, index) => (
                                <tr key={index}>
                                    <td>{expense.date}</td>
                                    <td>{expense.time}</td>
                                    <td>{expense.description}</td>
                                    <td>{expense.amount}</td>
                                    <td>{expense.comment}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}