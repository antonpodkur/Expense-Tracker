import {useState, useEffect} from 'react';

export default function AllExpenses(){
    const [expenses, setExpenses] = useState([]);
    const [sortStates, setSortStates] = useState([true, true, true, true, true]);


    const [date, setDate] = useState(undefined);
    const [time, setTime] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [amount, setAmount] = useState(undefined);
    const [comment, setComment] = useState(undefined);

    const [editing, setEditing] = useState(false);

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
            console.log(expenses);
    }

    function onChangeDate(e){
        setDate(e.target.value);
    }

    function onChangeTime(e){
        console.log(e.target.value);
        setTime(e.target.value);
    }

    function onChangeDescription(e){
        setDescription(e.target.value);
    }

    function onChangeAmount(e){
        setAmount(e.target.value);
    }

    function onChangeComment(e){
        setComment(e.target.value);
    }

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


    const saveData = async (e,olddatetime, olddescription, oldamount, oldcomment, _id) => {
        e.preventDefault();
        let newdatetime = '';
        let newdescription = '';
        let newamount = '';
        let newcomment = '';
        console.log(olddatetime);
        console.log(new Date(olddatetime));
        console.log(date)
        console.log(time);
        if(date === undefined && time === undefined) newdatetime =  new Date(olddatetime);
        if(date !== undefined && time === undefined) {
            console.log('in second if')
            newdatetime = new Date(date).setHours(new Date(olddatetime).getHours(), new Date(olddatetime).getMinutes());
            console.log(newdatetime);
        }
        if(date === undefined && time !== undefined) {
            newdatetime =  new Date(olddatetime);
            const hoursAndMinutes = time.split(':');
            const hours = hoursAndMinutes[0];
            const minutes = hoursAndMinutes[1];
            newdatetime.setHours(hours,minutes);
            console.log(newdatetime);
        }
        if(date!== undefined && time !== undefined) {
            newdatetime =  new Date(date);
            const hoursAndMinutes = time.split(':');
            const hours = hoursAndMinutes[0];
            const minutes = hoursAndMinutes[1];
            newdatetime.setHours(hours,minutes);
            console.log(newdatetime);
        }

        if(description !== undefined) newdescription = description;
        else newdescription = olddescription;

        if(amount !== undefined) newamount = amount;
        else newamount = oldamount;

        if(comment !== undefined) newcomment = comment;
        else newcomment = oldcomment;

        const result = await fetch('http://localhost:3000/api/expense/updateExpense', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    _id,
                    datetime: newdatetime,
                    description: newdescription,
                    amount: newamount,
                    comment: newcomment,
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

        setDate(undefined);
        setTime(undefined);
        setDescription(undefined);
        setAmount(undefined);
        setComment(undefined);  
    };

    const deleteData = async (e, _id) => {
        e.preventDefault();
        const result = await fetch('http://localhost:3000/api/expense/deleteExpense', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    _id
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

    const refreshExpenses = (e) => {
        e.preventDefault();
        getExpenses();
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
                            <th onClick={sortByAmount}>amount, $</th>
                            <th onClick={sortByComment}>comment</th>
                            {editing 
                                ? <td><button onClick={() => setEditing(false)}>Finish</button></td>
                                : <td><button onClick={() => setEditing(true)}>Edit</button></td>
                            }
                            {!editing 
                                ? <td><button onClick={refreshExpenses}>Refresh</button></td>
                                : ''
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            expenses && expenses.map((expense, index) => (
                                (editing 
                                    ?   <tr key={index}>
                                            <td><input type="date" onChange={onChangeDate} placeholder="date"/></td>
                                            <td><input type="text" onChange={onChangeTime} placeholder={`${new Date(expense.datetime).getHours()}:${new Date(expense.datetime).getMinutes()}`}/></td>
                                            <td><input type="text" onChange={onChangeDescription} placeholder={expense.description}/></td>
                                            <td><input type="number" onChange={onChangeAmount} placeholder={expense.amount}/></td>
                                            <td><input type="text" onChange={onChangeComment} placeholder={expense.comment}/></td>
                                            <td><button onClick={(e) => saveData(e,expense.datetime, expense.description, expense.amount, expense.comment, expense._id)}>Save</button></td>
                                            <td><button onClick={(e) => deleteData(e,expense._id)}>Delete</button></td>
                                        </tr>
                                    :   <tr key={index}>
                                            <td>{`${new Date(expense.datetime).getDate()}.${new Date(expense.datetime).getMonth() + 1 }.${new Date(expense.datetime).getFullYear()}`}</td>
                                            <td>{`${new Date(expense.datetime).getHours()}:${new Date(expense.datetime).getMinutes()}`}</td>
                                            <td>{expense.description}</td>
                                            <td>{expense.amount}</td>
                                            <td>{expense.comment}</td>
                                        </tr>

                                )
                                
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}