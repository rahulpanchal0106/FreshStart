const express = require('express');
const morgan = require('morgan');
const path = require('path');
const parser = require('body-parser');

// const exphbs = require('express-handlebars');
const { connection} = require('./database/database.js');
const app = express();

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','login.html'));
})
app.use(morgan('combined'));

app.use(parser.json());
app.use(parser.urlencoded({extended:true}));



app.use(express.static(path.join(__dirname,'public')));
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke !')
});
app.post('/registration',(req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const pass = req.body.password;
    const clg = req.body.college;
    const name = req.body.name;
    const branch = req.body.branch;
    const sem = req.body.semester;
    const phone = req.body.phone;
    const city = req.body.city;
    connection.connect(function(error){
        if (error) throw error;
        var check = "SELECT * FROM userData WHERE email = '"+email+"' AND password = '"+pass+"';"
        
        var sql = "INSERT INTO userData(email,password,college,name,branch,semester,phone,city) VALUES('"+email+"','"+pass+"','"+clg+"','"+name+"','"+branch+"','"+sem+"','"+phone+"','"+city+"') "
        
        connection.query(check,function(error,result){
        
            if (error) throw error;
            if(result.length==0){
                connection.query(sql,function(error,result){
                    if (error) throw error;
                    console.log(`${email} is now registered!`);
                    res.status(201).sendFile(path.join(__dirname,'public','index.html'));    
                })
            }else{
                console.log("⚠️⚠️⚠️\nUser already exists");
                res.redirect('/');
            }
        })
        
    })
    
});


// app.engine('hbs', exphbs({ extname: 'hbs' }));
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.get('/profile',(req,res)=>{
    const sql = 'SELECT * FROM userData';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.render('profile', { data: results });
    })
});
app.get('/registration',(req,res)=>{
    //res.sendFile(path.join(__dirname,'public','registration.html'));
    res.sendFile(path.join(__dirname,'public','registration.html'));
});

// app.get('/home',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'));
// });

// app.get('/qna',(req,res)=>{
//     var sql = "select * from "
//     res.sendFile(path.join(__dirname,'public','qna.html'));
// })

// app.post('/qna',(req,res)=>{
//     // const question = req.body.question;
//     // console.log(question,":Question");
//     const answer = req.body.answer;
//     const question_id=2;
//     const senior_name = "xyz";
//     var sql = "INSERT INTO answers(answer_text,question_id,senior_name) VALUES('"+answer+"','"+question_id+"','"+senior_name+"') ";
//     connection.query(sql,function(error,result){
        
//         if (error) throw error;
//         res.redirect('/qna');
//     })
//     res.json({
//         "Answer":answer,
//     });

// })

// app.get('/qna', (req, res) => {
//     // const questionId = 123; 

//     // res.render('qna.ejs', { questionId: questionId });
//     res.sendFile(path.join(__dirname,'public','qnaChat.html'));
// });

app.get("/chat", (req, res) => {
    
	res.sendFile(path.join(__dirname ,"src/index.html"));

});





// app.post('/ask',(req, res) => {
//     const { studentName, question } = req.body;
  
//     try {
//       const [rows] =  connection.execute(
//         'INSERT INTO questions (student_name, question_text) VALUES (?, ?)',
//         [studentName, question]
//       );
  
//       res.redirect('/qna'); // Redirect to the QnA page or a success page
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
// });

// app.get('/question/:id', async (req, res) => {
//     const questionId = req.params.id;
  
//     try {
//       const [questionsRows] = await connection.execute(
//         'SELECT * FROM questions WHERE id = ?',
//         [questionId]
//       );
  
//       const [commentsRows] = await connection.execute(
//         'SELECT * FROM comments WHERE question_id = ?',
//         [questionId]
//       );
  
//       const question = questionsRows[0];
//       const comments = commentsRows;
  
//       res.render('question', { question, comments });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Internal Server Error');
//     }
//   });
  


// app.get('/home', isAuthenticated, (req, res) => {
//     res.send('This is a protected route!');
//   });


app.post('/',(req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

    connection.connect(function(error){
        if (error) throw error;
        
        var sql = "SELECT * FROM userData WHERE email = '"+email+"' AND password = '"+password+"';"
        
        connection.query(sql,function(error,result){
            if (error) throw error;
            if(result.length===0){
                console.log("No user found");
                res.json({
                    error:"No user found"
                })
            }else{
                //const welcome = `<div id="welcome-block"><p>Welcome! ${result.name}</p></div>`
                res.sendFile(path.join(__dirname,'public','index.html'));
            }
            
        })
        
    })
})



// app.get('/qna',(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','QNA1.html'));
// })

// app.get("/users", (req, res) => {
//     const notes = getUsers()
//     res.send(notes)
// })
  
// app.get("/users/:id", (req, res) => {
//   const id = req.params.id
//   const note = getUser(id)
//   res.send(note)
// })

// app.post("/users", async (req, res) => {
//   const { title, contents } = req.body
//   const note = createUser(title, contents)
//   res.status(201).send(note)
// })

// app.get('/*',(req,res)=>{
//   res.status(400).json({
//       "error":"The page does not exists"
//   })
// })
module.exports= app;
