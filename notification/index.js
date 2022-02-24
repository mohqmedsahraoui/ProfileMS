 import express from 'express'
 const app = express()
 const port = 7000

// const Permissions = require("./permissionsConfig");
import Permissions from './permissionsConfig.js'
import { PROTECTED_URLS, NOT_PROTECTED} from './permissions.js' 
import requireLogin from './requireLogin.js'

 


const PERMISSIONS = new Permissions(PROTECTED_URLS).notProtect(
  ...NOT_PROTECTED
); 


app.use((req, res, next) => {
  return requireLogin(req, res, next, PERMISSIONS);
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const notification = [
    {
       type : 'Success',
       text : 'Geted notification successfully with token verification',
       color : 'Green',
       enable : true,
       API : 'API Notification :7000'
    },
    
]


app.get('/landing-notification', async (req, res) => {
  res.send({landing : true})
  
}) 

app.get('/', async (req, res) => {
   res.send(notification)
 })

 app.post('/', async (req, res) => {
     let createdDate = " February 17 2022 "
     let profileCreated = {
        fullName : 'momo',
        lastName : 'momo',
        age : 25,
        city : 'Paris',
        phone : '+33 655 24 58 62',
        address : '58 Rue de edouard',
        createdDate : createdDate
     }
    res.send(profileCreated)
 })

 
 app.put('/', async (req, res) => {
   res.send( {...notification, updated : true} )
})

app.delete('/', async (req, res) => {
   res.send( { deleted : true} ) 
 })

