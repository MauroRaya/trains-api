import { Inject } from '@nestjs/common';
import { Client, QueryResult } from 'pg';
import QueryStream from 'pg-query-stream';

export class TrainRepository {
  constructor(@Inject("PG_CLIENT") private readonly client: Client) {}

  async getTrains(): Promise<any[]> {
    const query = "SELECT * FROM trains";
    const result: QueryResult = await this.client.query(query);
    const { rows } = result;
    return rows;
  }

  getTrainsStream(): QueryStream {
    const query = new QueryStream("SELECT * FROM trains");
    return this.client.query(query);
  }

  async createTrains(amount: number) {
    const query = `
      INSERT INTO trains (name, capacity, active)
      SELECT
        'Train_' || gs,
        (random() * 500)::int,
        (random() > 0.5)
      FROM generate_series(1, $1) AS gs
      RETURNING *;
    `;

    const result: QueryResult = await this.client.query(query, [amount]);
    const { rows } = result;

    return { inserted: rows.length };
  }
}
