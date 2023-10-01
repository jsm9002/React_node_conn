const express = require('express')  //express 기능을 사용하기 위한 요청
const app = express(); // 요청된 express 를 사용하기 위한 app
const indexRouter = require('./routes') //routes 폴더에 있는 index 파일실행하기
const userRouter = require('./routes/user') //routes 폴더에 있는 user 파일실행
const path = require('path'); // express 의 path 기능 사용을 위한 요청

//정적인 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname,'react-project','build')))

//cors 오류 해결을 위해 cors 설치
app.use(cors());
app.use(express.json());

//body-parser 미들웨어 대체 express 내장 모듈
app.use(express.urlencoded({extended:false}))

//router
app.use('/', indexRouter) // '/'에 routes 폴더에 있는 파일을 실행
app.use('/user', userRouter)

// 3000번 포트는 리액트 테스트서버 포트여서 피해서 써유
app.set('port', process.env.PORT || 5500) //포트번호 설정해줘용

app.listen(app.get('port'),()=>{
    console.log('port waiting ....😐')
})  //5500번 포트번호에 접속할 경우에 나올 콘솔메세지 설정
