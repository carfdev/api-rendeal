export class Admin {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly rolId: number,
    public readonly error?: string
  ) {}
}
