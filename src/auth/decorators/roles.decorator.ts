import { SetMetadata } from '@nestjs/common';
import { ROLES } from 'src/users/entities/role.entity';

export const ROLE_KEY = 'roles';

export const Roles = (...roles: ROLES[]) => SetMetadata(ROLE_KEY, roles);
