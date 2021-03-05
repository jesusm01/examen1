import mongoose from '../connection/connect.js';
import modelenum from '../utils/enumModel.js';

class ToDoModel{

    constructor(){
        this.Schema = mongoose.Schema;
        this.ToDoSchema = new this.Schema({
            name:{
                type: String,
                required : true
            },
            description:String,
            date:{
                type: String,
                required : true
            },
            hour:{
                type: String,
                required: true,
                validate:{
                    validator:(value)=>{
                        return /([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])/g.test(value);
                    },
                    message: (props)=>`Esta hora ${props.value} es invalida`,
                }
            },
            done:Boolean
        });
        if(modelenum["todo"] == null){
            this.mymodel = mongoose.model("todo",this.ToDoSchema);
            modelenum["todo"] = this.mymodel;
        }else{
            this.mymodel = modelenum["todo"];
        }
        
    }

    ///Empezamos el CRUD

    ///CREATE
    async createToDo(name,description,date,hour,done){
        var task = {
            name,
            description,
            date,
            hour,
            done
        };
        var newToDo = new this.mymodel(task);
        var error = newToDo.validateSync();
        return new Promise((resolve, reject)=>{
            if(error){
                resolve(error);
                return;
            }
            newToDo.save().then((docs)=>{
                console.log("Succesful task register");
                resolve(docs);
            });
        });
    }

    ///DELETE

    async deleteToDo(id){
        return new Promise ((resolve,reject)=>{
            this.mymodel.remove({_id:id}).then((err,docs)=>{
                if (err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
                console.log("Succesful delete")
            });
        });
    }

    //UPDATE
    async updateToDo(id, TodoUpdate){
        return new Promise ((resolve,reject)=>{
            
            if(TodoUpdate.hour){
                var validate  = /([0-1][0-9]|2[0-4]):([0-5][0-9]):([0-5][0-9])/g.test(TodoUpdate.hour);
                if (validate==false){
                    resolve(`${TodoUpdate.hour} es una hora invalida`);
                    return;
                }
            }
            this.mymodel.update({_id:id},{$set: TodoUpdate},(err,docs)=>{
                if(err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
                console.log("Succesful update")
            });
        });
    }

    //GET
    async getToDo(){
        return new Promise ((resolve,reject)=>{
            this.mymodel.find({done:false},(err,docs)=>{
                if(err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
    }
    
    //CHECKED
    async checkTask(id){
        return new Promise ((resolve,reject)=>{
            this.mymodel.update({_id:id},{$set: {done:true}},(err,docs)=>{
                if(err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
                console.log("Checked task")
            });
        });
    }

}

export default ToDoModel;