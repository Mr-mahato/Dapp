const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send('welcome to the disscussion app');
})

app.get('/collectQuestion',(req,res)=>{
    fs.readFile('QuestionColl.json','utf-8',(err,data)=>{
        if(err){
            res.status(500).send('Internal Server Error');
        }else{
            res.status(200).send(data);
        }
    })
})

app.post('/getQuestion',(req,res)=>{
    const quesObj = req.body
    const id = Math.floor(Math.random()*1000);
    quesObj.id = id;
    console.log(quesObj);
    fs.readFile('QuestionColl.json','utf-8',(err,data)=>{
        if(err){
           res.status(500).send('Internal Server Error');
        }else{
            const obj = JSON.parse(data);
            obj.push(quesObj);
            fs.writeFile('QuestionColl.json',JSON.stringify(obj),(err)=>{
                if(err){
                    console.log(err);
                }else{
                    res.status(200).send('Data collected and updated in the Question coll file');
                }
            })
        }
    })
})

// solution resolving situation

app.post('/solutionPost',(req,res)=>{
    const SolnObj = req.body;
    fs.readFile('SolutionColl.json','utf-8',(err , data)=>{
        if(err) res.status(500).send(`Internal Server Error , solutionPart`);
        else 
        {
            data = JSON.parse(data);
            data.push(SolnObj);
            fs.writeFile('SolutionColl.json',JSON.stringify(data),(err)=>{
                if(err) res.status(500).send(`Internal Server Error , solutionPart`);
                else{
                    res.send(`solution updated successfully`);
                }
            })
        }
    })
})

app.get('/getSolution/:quesId',(req,res)=>{
    const {quesId} = req.params;
    fs.readFile('SolutionColl.json','utf-8',(err , data)=>{
        if(err) res.status(500).send(`Internal Server Error , solutionPart`);
        else 
        {
            data = JSON.parse(data);
            let reqSoln = [];

            data.forEach((val)=>{
                if(val.id == quesId)
                reqSoln.push(val);
            })

            reqSoln = JSON.stringify(reqSoln);
            res.send(reqSoln);
        }
    })
})

app.listen(3000 , (err)=>{
    console.log(`Server started at port 3000`);
})