import * as migration_20260120_003432_add_hero_localization from './20260120_003432_add_hero_localization';
import * as migration_20260120_033000_add_solutions_archive_block from './20260120_033000_add_solutions_archive_block';
import * as migration_20260127_120000_add_solutions_ordering from './20260127_120000_add_solutions_ordering';

export const migrations = [
  {
    up: migration_20260120_003432_add_hero_localization.up,
    down: migration_20260120_003432_add_hero_localization.down,
    name: '20260120_003432_add_hero_localization'
  },
  {
    up: migration_20260120_033000_add_solutions_archive_block.up,
    down: migration_20260120_033000_add_solutions_archive_block.down,
    name: '20260120_033000_add_solutions_archive_block'
  },
  {
    up: migration_20260127_120000_add_solutions_ordering.up,
    down: migration_20260127_120000_add_solutions_ordering.down,
    name: '20260127_120000_add_solutions_ordering'
  },
];
