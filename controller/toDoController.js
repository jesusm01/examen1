import ToDoModel from "../models/ToDoModel.js";

var toDo = new ToDoModel();

class ToDoController{
    constructor(){

    }

    async createToDo(request,response){
        var data = request.body;
        var result = await toDo.createToDo(
            data.name,
            data.description,
            data.date,
            data.hour,
            false
        );
        response.status(200).json(result);
    }

    async deleteToDo(request, response){
        var id = request.params.id;
        var result = await toDo.deleteToDo(id);
        response.status(200).json(result);
    }

    async updateTodo(request,response){
        var id = request.params.id;
        var newData = request.body;
        var result = await toDo.updateToDo(id,newData);
        response.status(200).json(result);
    }

    async getTodo(request,response){
        var result = await toDo.getToDo();
        response.status(200).json(result);
    }
    
    async checkTask(request,response){
        var id = request.params.id;
        var result = await toDo.checkTask(id);
        response.status(200).json(result);
    }

}

export default ToDoController;