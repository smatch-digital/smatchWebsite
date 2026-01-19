import * as migration_20260118_153052_add_i18n_support from './20260118_153052_add_i18n_support';
import * as migration_20260118_185709_fix_smartgrid_localization from './20260118_185709_fix_smartgrid_localization';

export const migrations = [
  {
    up: migration_20260118_153052_add_i18n_support.up,
    down: migration_20260118_153052_add_i18n_support.down,
    name: '20260118_153052_add_i18n_support',
  },
  {
    up: migration_20260118_185709_fix_smartgrid_localization.up,
    down: migration_20260118_185709_fix_smartgrid_localization.down,
    name: '20260118_185709_fix_smartgrid_localization'
  },
];
