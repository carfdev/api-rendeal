export interface IPG {
  create(tableName: string, data: {}): Promise<any>;
  findUnique(tableName: string, where: {}): Promise<any>;
}
