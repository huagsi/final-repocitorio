export class Proveedor {
    private id: number;
    //agrege2
    private status;
    constructor(id:number, private nombre:string, private direccion:string, private telefono:string) {
        this.id = id;
    }
    //cambie***
    set _id(__id){
        this.id = __id
    }

    get _id() {
        return this.id;
    }
    get _nombre() {
        return this.nombre;
    }

    get _direccion() {
        return this.direccion;
    }

    get _telefono() {
        return this.telefono;
    }
    //agrege2
    get _status() {
        return this.status;
    }    
    
}