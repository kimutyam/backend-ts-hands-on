import type { ParticipationSlot } from './participationSlot.js';

export type GeneralParticipantType = {
  kind: 'GeneralParticipantType';
  slot: ParticipationSlot;
};

export type VipParticipantType = {
  kind: 'VipParticipantType';
  slot: ParticipationSlot;
};

export type ParticipantType =
  | GeneralParticipantType
  | VipParticipantType;
