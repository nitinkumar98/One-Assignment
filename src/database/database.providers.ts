import mongoose, { Connection } from 'mongoose';

import { DATABASE_PROVIDERS } from '../constants';
import { productModelFn, usersModelFn } from '../models';


export const DatabaseProviers = [
  {
    provide: DATABASE_PROVIDERS.DATABASE_CONNECTION,
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DB_URL),
  },
  {
    provide: DATABASE_PROVIDERS.PRODUCTS_MODEL,
    useFactory: (connection: Connection) => productModelFn(connection),
    inject: [DATABASE_PROVIDERS.DATABASE_CONNECTION],
  },
  {
    provide: DATABASE_PROVIDERS.USERS_MODEL,
    useFactory: (connection: Connection) => usersModelFn(connection),
    inject: [DATABASE_PROVIDERS.DATABASE_CONNECTION],
  },
];

