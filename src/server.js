const  express = require('express') , app = express();
const  muddole = require("./muddole");
app.use(express.json());
const path = require("path");
const publicPath = path.join(__dirname , ".." ,"public");
app.use(express.static(publicPath))
const PORT = 8080;

let arIncomes = [
    {description: "demo-income-1" , amount: 1000 , id: 1},
    {description: "demo-income-2" , amount: 1000 , id: 2},
    {description: "demo-income-3" , amount: 1000 , id: 3}
    ];
    
let arExpenses = [
        {description: "demo-expense-1" , amount: 1000 , id: 1},
        {description: "demo-expense-2" , amount: 1000 , id: 2},
        {description: "demo-expense-3" , amount: 1000 , id: 3}
    ];
   
    console.log(arExpenses)

let arHistory = [
    // {operation:"post", date: 2012 ,  type:"get" ,  description:"yakov"  }
]    


    app.get("/history",(req,res)=>{res.send(arHistory)})
    app.post("/history" , (req,res) => {muddole.post(arHistory,req,res)});

    app.delete("/Incomes/:id" ,(req,res)=>{muddole.remove(arIncomes,req,res);});
    app.delete("/Expenses/:id" ,(req,res)=>{muddole.remove(arExpenses,req,res);});
    app.get("/Incomes" , (req,res) =>{res.send(arIncomes)});
    app.get("/Expenses", (req,res) =>{res.send(arExpenses)});
    app.patch("/Incomes/:id",(req,res)=>{muddole.update(arIncomes,req,res);});
    app.patch("/Expenses/:id",(req,res)=>{muddole.update(arExpenses,req,res);});
    app.post("/Expenses" , (req,res) => {muddole.post(arExpenses,req,res)});
    app.post("/Incomes" , (req,res) => {muddole.post(arIncomes,req,res)});
    app.get('*' , (req,res) => {res.send("<h1  style ='color:red'>Soory the page you are looking for was not found</h1>")})
    
    app.listen(PORT,()=>{
        console.log(`start listen  to : ${PORT}`)
    })
    