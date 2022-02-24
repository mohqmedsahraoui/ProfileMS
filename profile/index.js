 import express from 'express'
 const app = express()
 const port = 5000

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

const profile = [
    {
        fullName : 'momo',
        lastName : 'momo',
        age : 25,
        city : 'Paris',
        phone : '+33 655 24 58 62',
        address : '58 Rue de edouard',
        API : 'API Profile :5000'
    }
]


app.get('/landing-profile', async (req, res) => {
  res.send({landing : true})
  
}) 

app.get('/', async (req, res) => {
   res.send(profile)
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
   return  {...profile, updated : true}
})

app.delete('/', async (req, res) => {
    return { deleted : true}
 })

