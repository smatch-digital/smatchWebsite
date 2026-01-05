import * as migration_20251230_123137_init from './20251230_123137_init';
import * as migration_20251231_145427_fix_db_sync from './20251231_145427_fix_db_sync';
import * as migration_20260105_160729 from './20260105_160729';
import * as migration_20260105_172038 from './20260105_172038';
import * as migration_20260105_204651 from './20260105_204651';
import * as migration_20260105_235738 from './20260105_235738';

export const migrations = [
  {
    up: migration_20251230_123137_init.up,
    down: migration_20251230_123137_init.down,
    name: '20251230_123137_init',
  },
  {
    up: migration_20251231_145427_fix_db_sync.up,
    down: migration_20251231_145427_fix_db_sync.down,
    name: '20251231_145427_fix_db_sync',
  },
  {
    up: migration_20260105_160729.up,
    down: migration_20260105_160729.down,
    name: '20260105_160729',
  },
  {
    up: migration_20260105_172038.up,
    down: migration_20260105_172038.down,
    name: '20260105_172038',
  },
  {
    up: migration_20260105_204651.up,
    down: migration_20260105_204651.down,
    name: '20260105_204651',
  },
  {
    up: migration_20260105_235738.up,
    down: migration_20260105_235738.down,
    name: '20260105_235738'
  },
];
