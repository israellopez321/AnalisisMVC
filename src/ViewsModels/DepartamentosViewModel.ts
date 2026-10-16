import { RepositoryDepartamento } from '../Models/Data/RepositoryDepartamento';
import { RepositoryPersona } from '../Models/Data/RepositoryPersona';
import { Departamento } from '../Models/Entities/Departamento';
import { Persona } from '../Models/Entities/Persona';

export class DepartamentosViewModel {
  private readonly _listadoDep = RepositoryDepartamento.getListadoDepartamento();
  private _listadoPersonaPorDep: Persona[] = [];
  private _numPersonasPorDep = 0;
  private _depSeleccionado: Departamento | null = null;

  get listadoDep(): Departamento[] {
    return [...this._listadoDep];
  }

  get listadoPersonaPorDep(): Persona[] {
    return [...this._listadoPersonaPorDep];
  }

  get numPersonasPorDep(): number {
    return this._numPersonasPorDep;
  }

  get depSeleccionado(): Departamento | null {
    return this._depSeleccionado;
  }

  set depSeleccionado(departamento: Departamento | null) {
    this._depSeleccionado = departamento && this._listadoDep.some(
      (departamentoDisponible) => departamentoDisponible.id === departamento.id,
    ) ? departamento : null;
    this.rellenarListadoDePersonas();
    this.calcularNumeroPersonas();
  }

  rellenarListadoDePersonas(): Persona[] {
    this._listadoPersonaPorDep = this._depSeleccionado
      ? RepositoryPersona.getListadoPersonaPorDepartamento(this._depSeleccionado.id)
      : [];
    return this.listadoPersonaPorDep;
  }

  calcularNumeroPersonas(): number {
    this._numPersonasPorDep = this._listadoPersonaPorDep.length;
    return this._numPersonasPorDep;
  }
}