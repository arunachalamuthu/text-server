import express from 'express'
import multer from 'multer'
import postDetails from '../module/module.js'
import conversation from '../module/conversation.js'
import testServer from '../module/testserver.js'
import { text } from '../components/text.js'
import { search2 } from '../components/search2.js'
// import { upload } from '../components/upload.js'
import { newmessage } from '../components/newmessage.js'
import { message } from '../components/message.js'


import { fileURLToPath } from 'url';
import path from 'path'
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = express()

// router.use(express.static(path.join(__dirname,'../public')))

// router.get('/chat/:mycode&&:Friendcode', text)

router.get('/chat/:mycode&&:Friendcode', async (req, res) => {
  // console.log('chat');

  const mycode = req.params.mycode
  const Friendcode = req.params.Friendcode

  const mychat = await conversation.find({ _id: mycode })
  const Friendchat = await conversation.find({ _id: Friendcode })
  // console.log(mychat);
  let MyMessage = []
  let FriendMessage = []
  let length = mychat[0].List.length
  let length2 = Friendchat[0].List.length
  // console.log(Friendchat[0].List.length);
  for (let i = 0; i < length; i++) {

    MyMessage.push(mychat[0].List[i])

  }
  for (let i = 0; i < length2; i++) {
    FriendMessage.push(Friendchat[0].List[i].Message)
  }

  const sent = [{
    MyMessage: MyMessage,
    FriendMessage: FriendMessage
  
}]

 
  // console.log(sent);
  res.json(sent)


})


router.get('/frontpage/:ID', async (req, res) => {

  const find = await postDetails.findOne({ ID: req.params.ID })

  if (find) {
    const { FriendID } = find
    // console.log(FriendID);
 
     res.json([FriendID])
  }
})





// router.get('/image',(req,res)=>{
//   console.log(__dirname);

//  try{

//    let send=[
//     path.join(__dirname, `../public/Group 1000000832.png`),
//     path.join(__dirname, `../public/TL logo.png`)
//   ]

//    res.sendFile(path.join(__dirname, `../public/image-1679957270405.jpeg`));
//    console.log('image');
//    res.sendFile(upload2);
//  }
//  catch(err){
//    console.log(err.messsage);
//  }
//  })




router.post('/search', search2)


router.get('/loginPage/:name&&:Password', async (req, res) => {
  const ID = req.params.name
  const Password = req.params.Password
  const check = await postDetails.findOne({ ID: ID, Password: Password })
  // console.log(check);
  if (check) {
    res.json({ message: check })
  }
  else {
    res.json({ result: "you dont have account" })
  }
})


// image upload


let imagename=''
// const storage=multer.diskStorage({
//   destination:function (req,file,cd){
//     cd(null,"public")
//   },
//   filename: function(req,file,cd){
//     cd(null,file.fieldname+'-' +Date.now() +path.extname(file.originalname))

//     console.log('image'+file.originalname);
//     imagename=file.originalname
//   }
// })
// const upload =multer({storage})

// router.post('/login',upload.single("image"),(req,res)=>{
//   // console.log(res.body)
//   console.log('upload');

// })



// let upload=multer({
//   storage:multer.diskStorage({
//       destination:(req,file,cd)=> {
// cd(null,'../public')
//       },
//       filename:function (req,file,callback){
//         callback(null,file.fieldname+'-' +Date.now() +path.extname(file.originalname))
        
//       }

//   })

// })
// router.post('/ready',upload.single("image"),(req,res)=>{
//   // console.log(res.body)
//   console.log(req.file.filename);
//   console.log('upload');

// })


// router.post('/login', async (req, res) => {
//   const { ID, Password } = req.body



//   const check = await postDetails.findOne({ ID: ID, Password: Password })
//   if (check) {
//     console.log(check);
//   }
//   else {
//     const create = await postDetails({ ID: ID, Password: Password, imagename:imagename })
//     const finish = create.save()
//     res.json(finish)

//   }
// })






// router.post('/chat/msg', message)
try{
router.post('/chat/msg', newmessage)
}catch(err){console.log(err.message);}





export default router