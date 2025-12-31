import * as migration_20251230_123137_init from './20251230_123137_init';
import * as migration_20251231_145427_fix_db_sync from './20251231_145427_fix_db_sync';

export const migrations = [
  {
    up: migration_20251230_123137_init.up,
    down: migration_20251230_123137_init.down,
    name: '20251230_123137_init',
  },
  {
    up: migration_20251231_145427_fix_db_sync.up,
    down: migration_20251231_145427_fix_db_sync.down,
    name: '20251231_145427_fix_db_sync'
  },
];
