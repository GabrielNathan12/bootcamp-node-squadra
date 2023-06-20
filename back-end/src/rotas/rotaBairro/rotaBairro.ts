import { Router, Request, Response } from "express";
const App = Router();

App.get('/bairro', (resquest :Request, response :Response)=>{
    response.json();
});

App.post('/bairro', (resquest :Request, response :Response) =>{

});
App.put('/bairro:idbairro', (resquest :Request, response :Response)=>{
    response.json();
})
App.delete('/bairro:idbairro', (resquest :Request, response :Response)=>{
    response.json()
})

export default App;