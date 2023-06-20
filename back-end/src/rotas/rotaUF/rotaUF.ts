import { Router, Request, Response } from "express";
const App = Router();

App.get('/uf', (resquest :Request, response :Response)=>{
    response.status(200).json();
});

App.post('/uf', (resquest :Request, response :Response) =>{

});
App.put('/uf:iduf', (resquest :Request, response :Response)=>{
    response.json();
})
App.delete('/uf:iduf', (resquest :Request, response :Response)=>{
    response.json()
})

export default App;