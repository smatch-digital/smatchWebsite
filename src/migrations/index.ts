import * as migration_20251230_123137_init from './20251230_123137_init';

export const migrations = [
  {
    up: migration_20251230_123137_init.up,
    down: migration_20251230_123137_init.down,
    name: '20251230_123137_init'
  },
];
