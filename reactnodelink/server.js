//require, import ...
const express = require('express');
const app = express();

//Router Require
const indexRouter = require('./routes');
//index는 default 값이기 때문에 생략이 가능한 것 뿐
const userRouter = require('./routes/user')


const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

//정적인 파일을 가져오기 위한 미들웨어
app.use(express.static(path.join(__dirname, 'react-project', 'build')));
//Mac 이나 Linux 에서도 쓸수 있게 만들기 위해 경로를 저렇게 처리

//cors 오류 해결을 위한 미들웨어
// 1) cors 모듈 설치 npm install cors
// 2) require
// 3) 사용
app.use(cors());
app.use(express.json());

//body-parser 미들웨어 대체 express 내장 모듈
app.use(express.urlencoded({extended:false}));



//router
app.use('/', indexRouter);
app.use('/user', userRouter);

//app.get('*')는 Express 라우팅에서 사용되는 패턴 중, 
//'와일드 카드'로 모든 URL경로에 대한 처리를 진행
//단, 모든 라우팅 중, 가장 하단에 존재
// 리액트 + 노드 연동할때 꼭 필요한 존재!!!!!!!👁️👁️👁️👁️👁️
app.get('*', (req, res)=>{
        console.log('main router')
        res.sendFile(path.join(__dirname ,'react-project', 'build', 'index.html'))
    })



//Q. 왜 3000번은 안쓰나요?
//A. 3000번은 나중에 React에서 쓸거임
app.set('port', process.env.PORT || 3001);

app.listen(app.get('port'), ()=>{
    console.log('port waiting .....')
});