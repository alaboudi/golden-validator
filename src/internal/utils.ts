import { ObjectType } from './types';

export const isNullOrUndefined = (value: any): boolean => value === undefined || value === null;

export const isRule = (input: any): boolean => {
  try {
    return input._type === ObjectType.Rule;
  } catch {
    return false;
  }
};

export const isSchema = (input: any): boolean => {
  try {
    return input._type === ObjectType.Schema;
  } catch {
    return false;
  }
};
