import * as migration_20251230_123137_init from './20251230_123137_init';
import * as migration_20251231_094145_fix_missing_tables from './20251231_094145_fix_missing_tables';

export const migrations = [
  {
    up: migration_20251230_123137_init.up,
    down: migration_20251230_123137_init.down,
    name: '20251230_123137_init',
  },
  {
    up: migration_20251231_094145_fix_missing_tables.up,
    down: migration_20251231_094145_fix_missing_tables.down,
    name: '20251231_094145_fix_missing_tables'
  },
];
