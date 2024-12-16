import { type UserRole } from '@/types/main';
import { adminRoles } from '../constants/admin-roles';

export const isAdminRole = (role: UserRole) => {
  return adminRoles.includes(role);
};
