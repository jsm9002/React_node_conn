const express = require('express')
const router = express.Router();
const conn = require('../config/database')


router.post('/checkId',(req,res)=>{
   console.log('check Id Router :',req.body)
   
   let{id}=req.body;
   let sql = 'select id from project_member where id = ?'
   conn.query(sql,[id],(err,rows)=>{
    console.log('rows :', rows)
    console.log('err :',err);

    if(!err){
        if(rows.length > 0){
            res.json({result : 'dup'})
        }else{
            res.json({result : 'uniq'})
        }
    }else{
        console.log('DB를 확인해주세요.')
    }
   })
})

router.post('/join',(req,res)=>{
    console.log('join Router')
})
module.exports = router;