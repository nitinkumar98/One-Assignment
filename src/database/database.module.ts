import { Global, Module } from '@nestjs/common';

import { DatabaseProviers } from './database.providers';

@Global()
@Module({
    providers: [...DatabaseProviers],
    exports: [...DatabaseProviers],
})
export class DatabaseModule {}
