export class Departamento {
  constructor(
    private readonly _id: number,
    private readonly _nombre: string,
  ) {}

  get id(): number {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }
}