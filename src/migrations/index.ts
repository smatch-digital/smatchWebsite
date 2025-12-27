import * as migration_20251227_141521_fix_schema from './20251227_141521_fix_schema';

export const migrations = [
  {
    up: migration_20251227_141521_fix_schema.up,
    down: migration_20251227_141521_fix_schema.down,
    name: '20251227_141521_fix_schema'
  },
];
