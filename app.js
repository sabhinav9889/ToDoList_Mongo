const express = require('express');
const bodyParser = require('body-parser');
const { reset } = require('nodemon');
const e = require('express');
const mongoose = require('mongoose');
const dr = require(__dirname+'/public/javascripts/week.js');

const url = "mongodb+srv://camlot:test123@atlascluster.aq1xynh.mongodb.net/todolist";

let items = []; 

mongoose.connect(url);

const itemsSchema = {
    name: String
};

const listSchema = {
    name: String,
    items: [itemsSchema]
};

const List = mongoose.model("List", listSchema);

const item = mongoose.model("listItem", itemsSchema);

const item2 = new item({
    name: "Breakfast"
});

const item3 = new item({
    name: "Programming"
});

const item1 = new item({
    name: "Welcome to todolist!"
});

const defaultItems = [item3, item2, item1];


var d = dr.getdate();

const app = express();

let worklist = [];

let ele;

app.set('view engine', 'ejs');      

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static("public"));

app.get('/', function(req, res){
    item.find({}, function(err, foundItems){
        res.render('week',{listtitle:d, listitems:foundItems});
    })
});

app.post('/', function(req, res){
    ele = req.body.newItem;
    let val = req.body.button;
    const obj = new item({
        name : ele
    });
    obj.save();     
    res.redirect('/');
});

app.get('/:name', function(req, res){
    ele = req.body.newItem;
    const dir = req.params.name;
    List.findOne({name: dir},(err, ans)=>{
        if(!err){
            if(!ans){
                const item = new List({ 
                    name: dir,
                    items: defaultItems
                });
                item.save();
                res.redirect("/"+dir);
            }
            else{
                res.render('week',{listtitle: (ans.name), listitems: ans.items});
            }
        }
    });
});

app.post('/delete',(req, res)=>{
    var itm = req.body.itmname;
    item.deleteOne({_id: itm},(err)=>{
        if(err) console.log(err);
    });
    res.redirect('/');
});

app.listen(3000, function(){
    console.log("Server is listening on local host 3000");
});