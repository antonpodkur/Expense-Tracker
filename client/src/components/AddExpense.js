import {useState} from 'react';

export default function AddExpense() {
    const [date, setDate] = useState(Date.now());
    const [time, setTime] = useState(`${new Date(Date.now()).getHours()}:${new Date(Date.now()).getMinutes()}`);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [comment, setComment] = useState('');

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

    async function addExpense(e){
        e.preventDefault();
        const datetime = new Date(date);
        const hours = time.slice(0,2);
        const minutes = time.slice(3);
        datetime.setHours(hours,minutes);
        const result = await fetch('http://localhost:3000/api/expense/addExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    datetime,
                    description,
                    amount,
                    comment,
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

    return (
        <div>
            <h1>Add Expense</h1>
            <input type="date" value={date} onChange={onChangeDate} placeholder="date"/>
            <input type="text" value={time} onChange={onChangeTime} placeholder="time (ex. 14:32)"/>
            <input type="text" value={description} onChange={onChangeDescription} placeholder="description"/>
            <input type="number" value={amount} onChange={onChangeAmount} placeholder="amount"/>
            <input type="text" value={comment} onChange={onChangeComment} placeholder="comment"/>
            <button onClick={addExpense}>Add</button>
        </div>
    );
};