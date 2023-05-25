import { DeepPartial } from 'typeorm';

export interface GenericService<
  ENTITY,
  ID,
  DTO extends DeepPartial<ENTITY>,
  PARTIAL_DTO extends DeepPartial<ENTITY>,
> {
  create(data: DTO): Promise<ENTITY>;

  update(id: ID, data: PARTIAL_DTO): Promise<ENTITY>;

  delete(id: ID): Promise<boolean>;

  findAll(): Promise<ENTITY[]>;

  findOne(id: ID): Promise<ENTITY>;
}
