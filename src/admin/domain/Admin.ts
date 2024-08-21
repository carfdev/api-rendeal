export class Admin {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly rol_id: number
  ) {}
}
