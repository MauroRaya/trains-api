import { Client } from 'pg';

export const DatabaseProvider = {
  provide: 'PG_CLIENT',

  useFactory: async () => {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
      database: 'postgres',
    });

    await client.connect();
    return client;
  },
};
