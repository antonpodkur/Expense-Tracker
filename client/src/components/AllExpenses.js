import {useState, useEffect} from 'react';

export default function AllExpenses(){
    const [expenses, setExpenses] = useState([]);

    const [sortStates, setSortStates] = useState([true, true, true, true, true]);

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
            setExpenses(res.expenses.reverse());
            
        })();
    },[]);

    const sortAsc = (a,b,prop) => {
        if(a[prop] > b[prop]) return -1;
        if(a[prop] < b[prop]) return 1;
        return 0;
    };

    const sortDesc = (a,b, prop) => {
        if(a[prop] > b[prop]) return 1;
        if(a[prop] < b[prop]) return -1;
        return 0;
    };


    
    const sortByAmount = () => {
        const temp = [...expenses];
        if(sortStates[3]) temp.sort((a,b) => sortAsc(a,b, 'amount'));
        else temp.sort((a,b) => sortDesc(a,b, 'amount'));
        const tmpStates = [...sortStates];
        tmpStates[3] = !tmpStates[3];
        setExpenses(temp);
        setSortStates(tmpStates);
    }

    const sortByComment = () => {
        const temp = [...expenses];
        if(sortStates[4]) temp.sort((a,b) => sortAsc(a,b,'comment'));
        else temp.sort((a,b) => sortDesc(a,b,'comment'));
        const tmpStates = [...sortStates];
        tmpStates[4] = !tmpStates[4];
        setExpenses(temp);
        setSortStates(tmpStates);
    }

    const sortByDescription = () => {
        const temp = [...expenses];
        if(sortStates[2]) temp.sort((a,b) => sortAsc(a,b,'description'));
        else temp.sort((a,b) => sortDesc(a,b,'description'));
        const tmpStates = [...sortStates];
        tmpStates[2] = !tmpStates[2];
        setExpenses(temp);
        setSortStates(tmpStates);
    }

    const sortByTime = () => {
        const temp = [];
        const res = [];
        expenses.map((item,index) => {
            let tmpdate = new Date(item.datetime)
            temp.push({index, time: tmpdate.getHours()*60 + tmpdate.getMinutes()});
            return 0
        })
        if(sortStates[1]) temp.sort((a,b) => sortAsc(a,b,'time'));
        else temp.sort((a,b) => sortDesc(a,b,'time'));
        temp.map(item => {
            res.push(expenses[item.index]);
            return 0
        });
        const tmpStates = [...sortStates];
        tmpStates[1] = !tmpStates[1];
        setExpenses(res);
        setSortStates(tmpStates);
    }


    const sortByDate = () => {
        const temp = [...expenses];
        if(sortStates[0]) temp.sort((a,b) => {
            let dateA = new Date(a.datetime); 
            let dateB = new Date(b.datetime);
            if(dateA - dateB > 0) return -1;
            if(dateA - dateB < 0) return 1;
            return 0;
        });
        else temp.sort((a,b) => {
            let dateA = new Date(a.datetime); 
            let dateB = new Date(b.datetime);
            if(dateA - dateB > 0) return 1;
            if(dateA - dateB < 0) return -1;
            return 0;
        });
        const tmpStates = [...sortStates];
        tmpStates[0] = !tmpStates[0];
        setExpenses(temp);
        setSortStates(tmpStates);
    }


    return(
        <div>
            <h1>All expenses</h1>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th onClick={sortByDate}>date</th>
                            <th onClick={sortByTime}>time</th>
                            <th onClick={sortByDescription}>description</th>
                            <th onClick={sortByAmount}>amount</th>
                            <th onClick={sortByComment}>comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses && expenses.map((expense, index) => (
                                <tr key={index}>
                                    <td>{`${new Date(expense.datetime).getDate()}.${new Date(expense.datetime).getMonth() + 1 }.${new Date(expense.datetime).getFullYear()}`}</td>
                                    {/* <td>{`${new Date(expense.datetime).getDate()}`}</td> */}
                                    <td>{`${new Date(expense.datetime).getHours()}:${new Date(expense.datetime).getMinutes()}`}</td>
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