import { Compra } from "../dto/Compra";
import { PostgresConnection } from "../../shared/repository/Connections";


export class CompraRepository{
private pgConnection: PostgresConnection;

    constructor() {
        PostgresConnection.getConnection();
        this.pgConnection = PostgresConnection.getConnection();
    }
    
    save(compra: Compra): Promise<Compra> {
        return this.pgConnection.execute('INSERT INTO compras_humberto(cantidad, costo, fecha) VALUES ($1,$2,$3) RETURNING *', [compra._cantidad, compra._costo, compra._fecha]).then(
            (res) => {
                const { id, cantidad, costo, fecha } = res.rows[0];
                return new Compra(id, cantidad, costo, fecha);
            }
        );
    }

    delete(id: any): Promise<void> {
        return this.pgConnection.execute('DELETE FROM compras_humberto WHERE id = $1', [id]).then(() => { });
    }    

    //agregue****
    update(compra: Compra, _id): Promise<Compra> {
        return this.pgConnection.execute('UPDATE compras_humberto SET cantidad=$1, costo=$2, fecha=$3  WHERE id = $3', [_id, compra._cantidad, compra._costo, compra._fecha]).then((result) => {
            compra._id = _id;
            return compra;
        });
    }

    getAll(): Promise<Compra[]> {
        return this.pgConnection.execute('SELECT * FROM compras_humberto').then(
            (res) => {
                const rows = res.rows;
                return rows.map(row => {
                    const { id, cantidad, costo, fecha } = row;
                    return new Compra(id, cantidad, costo, fecha);
                })
            }
        );
    }

    getById(id: any): Promise<Compra> {
        return this.pgConnection.execute('SELECT * FROM compras_humberto WHERE id = $1 LIMIT 1', [id]).then(
            (res) => {
                const { id, cantidad, costo, fecha } = res.rows[0];
                return new Compra(id, cantidad, costo, fecha);
            }
        );
    }    

}
