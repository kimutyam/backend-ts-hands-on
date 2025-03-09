import type { ParticipationSlot } from 'zod_blog/400_refinement/participationSlot.js';

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
