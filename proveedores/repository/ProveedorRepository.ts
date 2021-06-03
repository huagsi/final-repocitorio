
import { Proveedor } from "../dto/Proveedor";
import { PostgresConnection } from "../../shared/repository/Connections";


export class ProveedorRepository{
private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }
    
    save(proveedor: Proveedor): Promise<Proveedor> {
        return this.pgConnection.execute('INSERT INTO proveedores_humberto(nombre, direccion, telefono) VALUES ($1,$2,$3) RETURNING *', [proveedor._nombre, proveedor._direccion, proveedor._telefono]).then(
            (res) => {
                const { id, nombre, direccion, telefono } = res.rows[0];
                return new Proveedor(id, nombre, direccion, telefono);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM proveedores_humberto WHERE id = $1', [id]).then(() => { });
    }    

    //agregue****
    update(proveedor: Proveedor, _id): Promise<Proveedor> {
        return this.pgConnection.execute('UPDATE proveedores_humberto SET nombre=$1, direccion=$2, telefono=$3  WHERE id = $3', [_id, proveedor._nombre, proveedor._direccion, proveedor._telefono]).then((result) => {
            proveedor._id = _id;
            return proveedor;
        });
    }

    getAll(): Promise<Proveedor[]> {
        return this.pgConnection.execute('SELECT * FROM proveedores_humberto').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const { id, nombre, direccion, telefono } = row;
                    return new Proveedor(id, nombre, direccion, telefono);
                })
            }
        );
    }

    getById(id: any): Promise<Proveedor> {
        return this.pgConnection.execute('SELECT * FROM proveedor_humberto WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, nombre, direccion, telefono } = res.rows[0];
                return new Proveedor(id, nombre, direccion, telefono);
            }
        );
    }    

}
