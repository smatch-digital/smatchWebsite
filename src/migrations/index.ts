import * as migration_20260120_003432_add_hero_localization from './20260120_003432_add_hero_localization';

export const migrations = [
  {
    up: migration_20260120_003432_add_hero_localization.up,
    down: migration_20260120_003432_add_hero_localization.down,
    name: '20260120_003432_add_hero_localization'
  },
];
