import type { Nominal } from '../../util/nominal';
import { Builder } from '../../util/nominal';

const name = 'ConfirmDateTime';
export type ConfirmDateTime = Nominal<typeof name, Date>;
export const ConfirmDateTime = {
  ...Builder<ConfirmDateTime>(name),
} as const;
