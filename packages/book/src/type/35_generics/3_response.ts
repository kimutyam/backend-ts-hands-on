// よくあるやつ
import type { BasicProfile, BusinessProfile } from '../30_object/12_extending_type_with_partial';

interface Response<T> {
  status: number;
  message: string;
  data: T;
}

export type BasicProfileResponse = Response<BasicProfile>; // {status: number, message: string, data: BasicProfile}
export type BusinessProfileResponse = Response<BusinessProfile>; // {status: number, message: string, data: BusinessProfile}
