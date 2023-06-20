import { Router, Request, Response } from "express";
const App = Router();

App.get('/pessoa', (resquest :Request, response :Response)=>{
    response.json();
});

App.post('/pessoa', (resquest :Request, response :Response) =>{

});
App.put('/pessoa:idpessoa', (resquest :Request, response :Response)=>{
    response.json();
})
App.delete('/pessoa:idpessoa', (resquest :Request, response :Response)=>{
    response.json()
})
export default App;