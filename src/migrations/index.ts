import * as migration_20260115_224626_init from './20260115_224626_init';

export const migrations = [
  {
    up: migration_20260115_224626_init.up,
    down: migration_20260115_224626_init.down,
    name: '20260115_224626_init',
  },
];
