# description 

* Create an API to enable system users to securely upload images provided that they are 
authenticated.




## required and installed 

• The API  written using Nodejs & express js & mongo db &  serverless 


•  The API  deployable to AWS Lambda 

endpoints:
 
  ANY - 


• The images stored into AWS S3 if the user is authorized
  and store URL image in mongo db as Json 


• register and login user api

•  securing  APIs 

- prevent nosql injection sanitize data 
- xss protection security headers
- rate limiting ,hpps cors
- create git ignore file and add all major securtiy file befour deploy in github

•  Create a GitHub repository with your projec

- //***** github here **********//


## Documentation 

*Document api by post man 

//******** post man here ***********//
# you can download directly 
https://drive.google.com/file/d/1hHT7Vq30knlRIQN8Pab_niKqOzfRADbG/view?usp=sharing
# you can import to your postman
https://www.getpostman.com/collections/b140def5ef8df089d2bb


## Install Dependencies
 ```
Notes: 
1- please rename config-example.env to config.env and fill with correct data
2- remove npx in following lines in package.json if your are not using os mac 
    "deploy": "npx serverless deploy",
    "dashboard": "npx serverless dashboard",
```

```
npm install
```

## Run App

```
# Run in dev mode

npm run dev

# Run in prod mode

npm start

# Run app in deployment mode with aws

npm run deploy


# Run app in test  mode with jest

npm run test



- Version: 1.0.0
- developer: hossam yahia 

