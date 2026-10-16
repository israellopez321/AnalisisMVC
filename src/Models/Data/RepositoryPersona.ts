import { Persona } from '../Entities/Persona';

export class RepositoryPersona {
  private static readonly personas = [
    new Persona(1, 'Lucía Martínez', 1),
    new Persona(2, 'Mateo Hernández', 1),
    new Persona(3, 'Valeria López', 1),
    new Persona(4, 'Hugo Sánchez', 1),
    new Persona(5, 'Sofía Ramírez', 2),
    new Persona(6, 'Daniel Castro', 2),
    new Persona(7, 'Emma Ortega', 2),
    new Persona(8, 'Pablo Flores', 3),
    new Persona(9, 'Alba Moreno', 3),
    new Persona(10, 'Leo Díaz', 4),
    new Persona(11, 'Carla Vega', 4),
    new Persona(12, 'Diego Navarro', 4),
    new Persona(13, 'Marcos Jiménez', 1),
    new Persona(14, 'Paula Romero', 1),
    new Persona(15, 'Adrián Molina', 1),
    new Persona(16, 'Elena Torres', 1),
    new Persona(17, 'Bruno Castillo', 1),
    new Persona(18, 'Nora Delgado', 1),
    new Persona(19, 'Álvaro Reyes', 1),
    new Persona(20, 'Irene Campos', 1),
    new Persona(21, 'Claudia Santos', 2),
    new Persona(22, 'Mario Fuentes', 2),
    new Persona(23, 'Aitana Cruz', 2),
    new Persona(24, 'Gabriel Prieto', 2),
    new Persona(25, 'Noelia Marín', 2),
    new Persona(26, 'Samuel León', 2),
    new Persona(27, 'Inés Cabrera', 2),
    new Persona(28, 'Raúl Pardo', 2),
    new Persona(29, 'Marta Iglesias', 2),
    new Persona(30, 'Celia Márquez', 3),
    new Persona(31, 'Javier Rojas', 3),
    new Persona(32, 'Alicia Peña', 3),
    new Persona(33, 'Iván Soto', 3),
    new Persona(34, 'Rocío Vidal', 3),
    new Persona(35, 'Óscar Esteban', 3),
    new Persona(36, 'Lara Méndez', 3),
    new Persona(37, 'Andrés Soler', 3),
    new Persona(38, 'Eva Gallardo', 3),
    new Persona(39, 'Tomás Arias', 3),
    new Persona(40, 'Candela Núñez', 4),
    new Persona(41, 'Pedro Blanco', 4),
    new Persona(42, 'Jimena Lozano', 4),
    new Persona(43, 'Nicolás Guerra', 4),
    new Persona(44, 'Vega Calvo', 4),
    new Persona(45, 'Sergio Pastor', 4),
    new Persona(46, 'Aroa Campos', 4),
    new Persona(47, 'Felipe Benítez', 4),
    new Persona(48, 'Marina Solís', 4),
    new Persona(49, 'Miriam Robles', 2),
    new Persona(50, 'Víctor Lozano', 3),
    new Persona(51, 'Sara Beltrán', 3),
    new Persona(52, 'Héctor Carmona', 4),
    new Persona(53, 'Lidia Escudero', 4),
    new Persona(54, 'Jaime Ferrer', 4),
  ];

  static getListadoPersonaPorDepartamento(idDepartamento: number): Persona[] {
    return this.personas.filter((persona) => persona.depId === idDepartamento);
  }

  static getListadoCompletoPersona(): Persona[] {
    return [...this.personas];
  }

  static deletePersona(idPersona: number): boolean {
    const indice = this.personas.findIndex((persona) => persona.id === idPersona);
    if (indice === -1) {
      return false;
    }

    this.personas.splice(indice, 1);
    return true;
  }
}