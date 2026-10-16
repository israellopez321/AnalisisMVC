import { Departamento } from '../Entities/Departamento';

export class RepositoryDepartamento {
  private static readonly departamentos = [
    new Departamento(1, 'Tecnología'),
    new Departamento(2, 'Diseño'),
    new Departamento(3, 'Recursos Humanos'),
    new Departamento(4, 'Marketing'),
  ];

  static getListadoDepartamento(): Departamento[] {
    return [...this.departamentos];
  }
}