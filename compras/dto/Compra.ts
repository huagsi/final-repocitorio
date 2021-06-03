export class Compra {
    private id: number;
    //agrege2
    private status;
    constructor(id:number, private cantidad:number, private costo:number, private fecha:Date) {
        this.id = id;
    }
    //cambie***
    set _id(__id){
        this.id = __id
    }

    get _id() {
        return this.id;
    }
    get _cantidad() {
        return this.cantidad;
    }

    get _costo() {
        return this.costo;
    }

    get _fecha() {
        return this.fecha;
    }
    //agrege2
    get _status() {
        return this.status;
    }    
    
}