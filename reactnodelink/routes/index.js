/* 페이지 이동을 다뤄주는 라우터 모음
메인 페이지
작성자 : 조성민 (23-09-18) 오전 10:15

*/
const express = require('express');
const router = express.Router(); //굳이 모든 라우터기능을 호출하지 않기위해
const path = require('path');

//main page
// router.get('/link', (req, res)=>{
//     console.log('main router')
//     res.sendFile(path.join(__dirname,'..' ,'react-project', 'build', 'index.html'))
// })

module.exports = router ;