export class Persona {
  constructor(
    private readonly _id: number,
    private readonly _nombre: string,
    private readonly _depId: number,
  ) {}

  get id(): number {
    return this._id;
  }

  get nombre(): string {
    return this._nombre;
  }

  get depId(): number {
    return this._depId;
  }
}