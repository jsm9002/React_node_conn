//user와 관련된 router들을 모아놓은 곳
/**
 * - 기능 : 회원가입 , 가입시중복체크, 로그인, 회원탈퇴, 로그아웃, 회원검색
 * - 작성자 : 조성민(23/09/19)
 */

const express = require('express');
const router = express.Router(); //굳이 모든 라우터기능을 호출하지 않기위해
const conn = require('../config/database');
const path = require('path')

//회원가입 시, ID중복체크
router.post('/checkId',(req,res)=>{
    console.log('check Id Router', req.body);    
    let{ id } = req.body;
    let sql = 'select id from project_member where id = ?'
    conn.query(sql,[id],(err, rows)=>{
        console.log('rows :', rows);
        console.log('err :',err);

        if(rows.length > 0 ){
            //중복값이 있다면?
            res.json({result : 'dup'});
        } else{
            //중복값이 없다면?
            res.json({result : 'uniq'});
        }
    });
})




// 회원가입 라우터
router.post('/join',(req,res)=>{
    console.log('join Router', req.body)
    console.log('join Router', req.body.id)
    let {id, pw, name, email} = req.body

    // let id_input = req.body.id
    // let pw_input = req.body.pw
    // let name_input = req.body.name
    // let email_input = req.body.email

    let sql = 'insert into project_member values (?,?,?,?)'
    conn.query(sql,[id,pw,name,email],(err, rows)=>{
        console.log('rows :', rows);
        console.log('err :',err);
        if(!err){
        console.log('값 보내기 성공: success')
        res.json({result : 'success'})
        }else{
            console.log('오류메세지:failed')
        res.json({result : 'failed'})
        }
    });
    
})

/**
 * router.posst('/login',(req,res)=>{
 *  console.log("login router")
 *  let{id, pw} = req.body;
 *  let sql = `select id,user_name,email from project_member where id=? and pw?`
 *  conn.query(sql,[id,pw],(err,rows)=>{
 *              console.log('rows',rows);
 *              
 *              if(rows.length >0){
 *                //로그인 성공
 *                  res.json{ msg:'success'},
 *                  user : rows[0]
 *              }else{
 *                //로그인 실패
 *                res.json({msg:'failed})
 *              }
 * })
 * })
 */



/**로그인라우터 */
router.post('/login',(req,res)=>{
    console.log('Node login 접속')
    let {id, pw} = req.body.userData
    console.log('id :',id)
    console.log('pw :',pw)

    let sql = 'select id,user_name,email from project_member where id=? and pw=?;'
    conn.query(sql,[id,pw],(err, rows)=>{    
        if(!err){
            if(rows.length >0){
                console.log('값 보내기 성공')
                console.log('login rows :', rows[0]);
                res.json({msg : 'success',
                        user : rows[0]})     
            }else{
                res.json({msg : 'failed'})
                console.log('해당하는 정보 없음')
            }
        }else{
            res.json({msg : 'failed'})
        console.log('failed')
        console.log('login err :',err);
        }
    });
    
})

/**비밀번호 수정 라우터 */
router.post('/checkPw',(req,res)=>{
    console.log('비밀번호 변경 node 접속') 
    console.log('비밀번호변경:',req.body)
    let{id,currentPw,changePw}=req.body //axios에서 보내온 데이터들 꺼내기
    console.log('받아온 데이터 확인',id,currentPw,changePw)

 
    /**ID와 현재 비밀번호를 이용한 회원조회 */
    let sql = 'select id from project_member where id=? and pw=?'
    /**비밀번호 변경을 위한 쿼리문 */
    let sql2 = 'update project_member set pw=? where id=?'
    

    conn.query(sql,[id,currentPw],(err,rows)=>{
        if(!err){
            if(rows.length >0){
                //우리회원이 맞음
                conn.query(sql2,[changePw,id],(err,rows)=>{
                    if(!err){
                        //비밀번호 변경 성공
                        console.log('비밀번호 변경 성공!')
                        res.json({msg : 'success'})
                    }else{
                        //비밀번호 변경 실패
                        console.log('실패후 에러 메세지:',err)
                        res.json({msg:'error'})
                    }
                })
            }else{
                //우리 회원이 아님
                console.log('게정이 존재하지 않습니다.')
                res.json({msg : 'failed'})
            }

        }else{
            console.log('계정1차확인 err 메세지:',err)
        }
    })
   
})



/**이름,이메일변경 라우터 */
router.post('/modify',(req,res)=>{
    console.log('Name,email modify node')
    console.log('modify data:',req.body)
    let{id,new_name,new_email}=req.body

    let sql = `update project_member set user_name='${new_name}', email='${new_email}' where id=${id}`
    
    conn.query(sql,(err,rows)=>{
        if(!err){
           console.log('값 수정하기 성공')
           res.json({msg:'success'})
        }else{
            console.log('err 메세지:',err)
            res.json({msg:'failed'})
        }
    })
})

/**회원탈퇴 라우터 */
router.post('/delete',(req,res)=>{
    console.log('회원탈퇴 라우터 접속')
    console.log('delete matching data:',req.body)
    let{id,pw}=req.body

    let sql = 'select id from project_member where id=? and pw=?'
    let sql2 = `delete from project_member where id=? and pw=?`
    conn.query(sql,[id,pw],(err,rows)=>{
        // console.log(rows);
        // if(rows){
        //     res.json({msg:'success'})
        // }else{
        //     res.json({msg:'failed'})
        // }


        if(!err){
            console.log(rows.data)
            if(rows.length>0){
                //입력받은 정보가 일치한 회원정보가 있음
                conn.query(sql2,[id,pw],(err,rows)=>{
                    if(!err){
                        console.log('회원정보삭제성공rows:',rows)
                       console.log('회원정보삭제성공')
                       res.json({msg:'success'})
                       
                    }else{
                        console.log('err 메세지:',err)
                        res.json({msg:'failed'})
                    }
                })

            }else{
                console.log('일치회원정보없음')
                res.json({msg:'failed'})
            }
        }else{

        }


    })
   
})

//회원정보검색 라우터
router.post('/select',(req,res)=>{
    console.log('select router')

    let sql = 'select id, user_name, email from project_member'

    conn.query(sql,(err,rows)=>{
        console.log('rows데이터:',rows)
        console.log('err데이터:',err)
        
        res.json({list : rows})
    })
})


router.post('/checkPw')
//로그아웃 라우터(url로 바로접근하는 경우에는 get방식으로 해주어야함)
// session을 server에 저장한 경우에는 해당 라우터로 와야함(기존)
// session을 front에 저장한 경우에는 로그아웃을 react에서 설정 가능
router.get('/logout');

//비밀번호 수정 라우터

//라우터 와일드카드
// 위에 훝고 왔던 router에 전부 해당하지 않으면, 이 라우터로 들어오겠다.
// router.get('*', (req, res)=>{
//     console.log('main router')
//     res.sendFile(path.join(__dirname,'..' ,'react-project', 'build', 'index.html'))
// })



module.exports = router ;