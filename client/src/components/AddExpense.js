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
        const hoursAndMinutes = time.split(':');
        const hours = hoursAndMinutes[0];
        const minutes = hoursAndMinutes[1];
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
        <div className="flex flex-col items-center bg-gray-200 rounded regular">
            <div className="text-2xl font-bold py-5">Add Expense</div>
            <div className="flex flex-col lg:flex-row">
                <input 
                    type="date" 
                    value={date} 
                    onChange={onChangeDate} 
                    placeholder="date"
                    className="mb-5 rounded mx-1"
                    />
                <input 
                    type="text" 
                    value={time} 
                    onChange={onChangeTime} 
                    placeholder="time (ex. 14:32)"
                    className="mb-5 rounded mx-1"
                    />
                <input 
                    type="text" 
                    value={description} 
                    onChange={onChangeDescription} 
                    placeholder="description"
                    className="mb-5 rounded mx-1"
                    />
                <input 
                    type="number" 
                    value={amount} 
                    onChange={onChangeAmount} 
                    placeholder="amount"
                    className="mb-5 rounded mx-1"
                    />
                <input 
                    type="text" 
                    value={comment} 
                    onChange={onChangeComment} 
                    placeholder="comment"
                    className="mb-5 rounded mx-1"
                    />
            </div>
            <button 
                    onClick={addExpense}
                    className="w-5/6 rounded bg-green-800 text-white mb-5 font-bold"
                    >Add
                </button>
        </div>
    );
};