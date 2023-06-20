import { Router, Request, Response } from "express";
const App = Router();

App.get('/municipio', (resquest :Request, response :Response)=>{
    response.json();
});

App.post('/municipio', (resquest :Request, response :Response) =>{

});
App.put('/municipio:idmunicipio', (resquest :Request, response :Response)=>{
    response.json();
})
App.delete('/municipio:idmunicipio', (resquest :Request, response :Response)=>{
    response.json()
})

export default App;