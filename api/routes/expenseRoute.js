const router = require('express').Router();
const { verifyJWT } = require('../verifications');
const Expense = require('../models/Expense');
const { verify } = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;



router.post('/addExpense',verifyJWT, async (req, res) => {

    const _id = req.userId;
    const {datetime,description, amount, comment} = req.body;

    try{
        const expense = await Expense.create({datetime,description, amount, comment, user_id: _id});
        console.log('Expense has been created', expense);
        res.json({status: 'ok'});
    }catch(e){
        console.log(e);
        res.json({status: 'error', error: e.message});
    }
});

router.post('/getExpenses', verifyJWT, async (req, res) => {
    const _id = new ObjectId(req.userId);
    console.log(_id);

    try{
        const expenses = await Expense.find({user_id: _id});
        console.log(expenses);
        res.status(200).json({ expenses });
    }catch(e){
        res.status(500)
    }
})

router.patch('/updateExpense', async (req,res) => {
    const {_id ,datetime,description, amount, comment} = req.body;

    try{
        const expense = await Expense.updateOne({ _id },
            {
                $set: {datetime, description, amount, comment}
            }  
        )
        console.log('Expense updated', expense);
        res.json({status: 'ok'});
    } catch(e) {
        res.json({status: 'error', error: e.message});
    }    
});


router.delete('/deleteExpense', async (req,res) => {
    const {_id} = req.body;

    try{
        const expense = await Expense.deleteOne({_id});
        res.json({status: 'ok'});
        console.log('Expense deleted', expense);
    } catch(e){
        res.json({status: 'error', error: e.message});
    }
});




module.exports = router;