import * as migration_20251227_135516_initial_schema_snapshot from './20251227_135516_initial_schema_snapshot';

export const migrations = [
  {
    up: migration_20251227_135516_initial_schema_snapshot.up,
    down: migration_20251227_135516_initial_schema_snapshot.down,
    name: '20251227_135516_initial_schema_snapshot'
  },
];
