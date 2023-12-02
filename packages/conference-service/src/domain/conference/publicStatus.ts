export const PUBLIC_STATUS = {
  DRAFTED: 'DRAFTED',
  PUBLISHED: 'PUBLISHED',
  CALLED_OFF: 'CALLED_OFF',
} as const;

export type PublicStatus = (typeof PUBLIC_STATUS)[keyof typeof PUBLIC_STATUS];
