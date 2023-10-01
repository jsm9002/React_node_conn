/**
 * 페이지 이동을 다루어 주는 라우터 모음
 * 메인페이지
 * 
 */


const express = require('express'); //express 기능을 호출한당.
const router = express.Router(); //express의 기능중에서 Router 기능만 쓸수 있게 한다
const path = require('path'); //다른운영체제에서 주소 호환성을 위해 쓸 기능

//main page
router.get('/link',(req,res)=>{
    console.log('main router')
    res.sendFile(path.join(__dirname,'..','react-project','build','index.html'))
    //react 프로젝트 폴더에 최종 랜더링 폴더인 index.html 파일을 localhost:5500/ 에 랜더해줘용
})

module.exports = router;