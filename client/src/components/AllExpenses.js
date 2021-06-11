import {useState, useEffect} from 'react';

export default function AllExpenses(){

    // Expenses
    const [expenses, setExpenses] = useState([]);
    const [sortStates, setSortStates] = useState([true, true, true, true, true]);

    // Expense fields to update
    const [date, setDate] = useState(undefined);
    const [time, setTime] = useState(undefined);
    const [description, setDescription] = useState(undefined);
    const [amount, setAmount] = useState(undefined);
    const [comment, setComment] = useState(undefined);

    // filter states
    const [dateToFind, setDateToFind] = useState('');
    const [timeToFind, setTimeToFind] = useState('');
    const [descriptionToFind, setDescriptionToFind] = useState('');
    const [amountToFind, setAmountToFind] = useState('');
    const [commentToFind, setCommentToFind] = useState('');

    const [dateToFindFrom, setDateToFindFrom] = useState('');
    const [dateToFindTo, setDateToFindTo] = useState('');
    const [timeToFindFrom, setTimeToFindFrom] = useState('');
    const [timeToFindTo, setTimeToFindTo] = useState('');
    const [amountToFindFrom, setAmountToFindFrom] = useState('');
    const [amountToFindTo, setAmountToFindTo] = useState('');

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

    const finishEditing = (e) => {
        e.preventDefault();
        setEditing(false);
        getExpenses();
    }

    const refreshExpenses = (e) => {
        e.preventDefault();
        getExpenses();
    }

    // filter fields binding

    function onChangeDateToFind(e){
        setDateToFind(e.target.value);
    }

    function onChangeTimeToFind(e){
        console.log(e.target.value);
        setTimeToFind(e.target.value);
    }

    function onChangeDescriptionToFind(e){
        setDescriptionToFind(e.target.value);
    }

    function onChangeAmountToFind(e){
        setAmountToFind(e.target.value);
    }

    function onChangeCommentToFind(e){
        setCommentToFind(e.target.value);
    }

    // filter functions

    const filter = () => {
        let tmp = [...expenses];

        // date range start

        if(dateToFindFrom !== '' && dateToFindTo === '') {
            tmp = tmp.filter(item => {
                return new Date(item.datetime) > new Date(dateToFindFrom);
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(dateToFindFrom === '' && dateToFindTo !== '') {
            tmp = tmp.filter(item => {
                return new Date(item.datetime) < new Date(dateToFindTo);
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(dateToFindFrom !== '' && dateToFindTo !== '') {
            tmp = tmp.filter(item => {
                return new Date(item.datetime) > new Date(dateToFindFrom) && new Date(item.datetime) < new Date(dateToFindTo);
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        // date range end

        // time range start 

        if(timeToFindFrom !== '' && timeToFindTo === '') {
            tmp = tmp.filter(item => {
                let minutesFrom = timeToFindFrom.split(':')[0]*60 + timeToFindFrom.split(':')[1]*1;
                let minutes = new Date(item.datetime).getHours()*60 + new Date(item.datetime).getMinutes();
                console.log('minutes1')
                console.log(minutes);
                console.log(minutesFrom);
                console.log(minutes > minutesFrom)
                return minutes > minutesFrom;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(timeToFindFrom === '' && timeToFindTo !== '') {
            tmp = tmp.filter(item => {
                let minutesTo = timeToFindTo.split(':')[0]*60 + timeToFindTo.split(':')[1]*1;
                let minutes = new Date(item.datetime).getHours()*60 + new Date(item.datetime).getMinutes();
                return minutes < minutesTo;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(timeToFindFrom !== '' && timeToFindTo !== '') {
            tmp = tmp.filter(item => {
                let minutesFrom = timeToFindFrom.split(':')[0]*60 + timeToFindFrom.split(':')[1]*1;
                let minutesTo = timeToFindTo.split(':')[0]*60 + timeToFindTo.split(':')[1]*1;
                let minutes = new Date(item.datetime).getHours()*60 + new Date(item.datetime).getMinutes();
                return minutes > minutesFrom && minutes < minutesTo;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        // time range end

        // amount range start

        if(amountToFindFrom !== '' && amountToFindTo === '') {
            tmp = tmp.filter(item => {
                return item.amount > amountToFindFrom;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(amountToFindFrom === '' && amountToFindTo !== '') {
            tmp = tmp.filter(item => {
                return item.amount < amountToFindTo;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(amountToFindFrom !== '' && amountToFindTo !== '') {
            tmp = tmp.filter(item => {
                return item.amount > amountToFindFrom && item.amount < amountToFindTo;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        // amount range end

        if(dateToFind !== ''){
            tmp = tmp.filter(item => {
                return `${new Date(item.datetime).getDate()}.${new Date(item.datetime).getMonth()}.${new Date(item.datetime).getFullYear()}` === `${new Date(dateToFind).getDate()}.${new Date(dateToFind).getMonth()}.${new Date(dateToFind).getFullYear()}`
            });

        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(timeToFind !== ''){
            tmp = tmp.filter(item => {
                console.log(`${new Date(item.datetime).getHours()}:${new Date(item.datetime).getMinutes()}` === timeToFind)
                return `${new Date(item.datetime).getHours()}:${new Date(item.datetime).getMinutes()}` === timeToFind
            });
            console.log(tmp);
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(descriptionToFind !== ''){
            tmp = tmp.filter(item => {
                return item.description === descriptionToFind;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(amountToFind !== ''){
            tmp = tmp.filter(item => {
                return item.amount.toString(10) === amountToFind;
            });
            console.log(tmp);
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        if(commentToFind !== ''){
            tmp = tmp.filter(item => {
                return item.comment === commentToFind;
            });
        }
        if(tmp === []) {
            setExpenses([]);
            return;
        }

        setExpenses(tmp);
        // console.log(expenses);
    }

    const filterFind = (e) => {
        e.preventDefault();
        filter();
    }

    const filterClear = (e) => {
        e.preventDefault();
        setDateToFind('');
        setTimeToFind('');
        setDescriptionToFind('');
        setAmountToFind('');
        setCommentToFind('');
        setDateToFindFrom('');
        setDateToFindTo('');
        setTimeToFindFrom('');
        setTimeToFindTo('');
        setAmountToFindFrom('');
        setAmountToFindTo('');
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
                                ? <td><button onClick={finishEditing}>Finish</button></td>
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

            <div>
                <h2>filters</h2>
                <div>
                    <h3>Find by</h3>
                    <div>date: <input type="date" value={dateToFind} onChange={onChangeDateToFind} placeholder="date"/></div>
                    <div>time: <input type="text" value={timeToFind} onChange={onChangeTimeToFind} placeholder="time (14:27)"/></div>
                    <div>description: <input type="text" value={descriptionToFind} onChange={onChangeDescriptionToFind} placeholder="description"/></div>
                    <div>amount: <input type="number" value={amountToFind} onChange={onChangeAmountToFind} placeholder="amount"/></div>
                    <div>comment: <input type="text" value={commentToFind} onChange={onChangeCommentToFind} placeholder="comment"/></div>
                </div>
                <div>
                        <h3>Ranges</h3>
                        <div>date: 
                            from <input type="date" value={dateToFindFrom} onChange={(e) => setDateToFindFrom(e.target.value)} placeholder="date"/>
                            to <input type="date" value={dateToFindTo} onChange={(e) => setDateToFindTo(e.target.value)} placeholder="date"/>
                        </div>
                        <div>time: 
                            from <input type="text" value={timeToFindFrom} onChange={(e) => setTimeToFindFrom(e.target.value)} placeholder="time"/>
                            to <input type="text" value={timeToFindTo} onChange={(e) => setTimeToFindTo(e.target.value)} placeholder="time"/>
                        </div>
                        <div>amount: 
                            from <input type="number" value={amountToFindFrom} onChange={(e) => setAmountToFindFrom(e.target.value)} placeholder="amount"/>
                            to <input type="number" value={amountToFindTo} onChange={(e) => setAmountToFindTo(e.target.value)} placeholder="amount"/>
                        </div>

                </div>
                <div>
                    <button onClick={filterFind}>Find</button>
                    <button onClick={filterClear}>Clear</button>
                </div>
            </div>
        </div>
    );
}