import * as migration_20260118_153052_add_i18n_support from './20260118_153052_add_i18n_support';

export const migrations = [
  {
    up: migration_20260118_153052_add_i18n_support.up,
    down: migration_20260118_153052_add_i18n_support.down,
    name: '20260118_153052_add_i18n_support'
  },
];
