const { italic } = require('colors')
const {register}=require('../../controllers/auth')
const User =require('../../models/User')

const httpMocks=require('node-mocks-http')

const newRegister=require('../mock-data/register.json')

User.create=jest.fn()
let req,res,next
beforeEach(()=>{
   
    req=httpMocks.createRequest()
    res=httpMocks.createResponse()
    next=null
})

describe('register new user',()=>{
    it('shoud register new user api function',()=>{
        expect(typeof register).toBe('function')
    })
    it('should create new user in user model',()=>{
      
        req.body=newRegister
        register(req,res,next)
        expect(User.create).toBeCalledWith(newRegister)
    })

    it('should return 200 respond code',()=>{
      
        req.body=newRegister
        register(req,res,next)
        expect(res.statusCode).toBe(200)
        expect(res._isEndCalled()).toBeTruthy()
    })
  
})

