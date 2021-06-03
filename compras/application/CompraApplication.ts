import { CompraRepository } from "../repository/CompraRepository";
import {Compra} from '../dto/Compra';
export class CompraApplication {
    constructor(private repository: CompraRepository) { }

    save(user: Compra) {
        return this.repository.save(user);
    }

    /*delete(id) {
        return this.repository.delete(id);
    }
    */
    //agrege**
    update(user: Compra, id) {
        return this.repository.update(user, id);
    }

    getAll() {
        return this.repository.getAll();
    }
/*
    getById(id) {
        return this.repository.getById(id);
    }
*/
}