import { ProveedorRepository } from "../repository/ProveedorRepository";
import {Proveedor} from '../dto/Proveedor';
export class ProveedorApplication {
    constructor(private repository: ProveedorRepository) { }

    save(user: Proveedor) {
        return this.repository.save(user);
    }

    /*delete(id) {
        return this.repository.delete(id);
    }
    */
    //agrege**
    update(user: Proveedor, id) {
        return this.repository.update(user, id);
    }

    getAll() {
        return this.repository.getAll();
    }

    getById(id) {
        return this.repository.getById(id);
    }

}