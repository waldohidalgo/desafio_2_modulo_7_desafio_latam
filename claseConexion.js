export default class Conexion {
  constructor(arrayComandos, pool) {
    this.arrayComandos = arrayComandos; //comando:orden más comandos adicionales

    this.pool = pool;
  }
  async ingresarEstudiante() {
    const argumentosData = this.arrayComandos.slice(1);

    if (argumentosData.length === 4) {
      const estudiante = {
        nombre: argumentosData[0],
        rut: argumentosData[1],
        curso: argumentosData[2],
        nivel: argumentosData[3],
      };

      try {
        const query = {
          text: "insert into estudiantes (nombre,rut,curso,nivel) values ($1, $2,$3, $4)",
          values: [
            estudiante.nombre,
            estudiante.rut,
            estudiante.curso,
            estudiante.nivel,
          ],
        };

        const response = await this.pool.query(query);

        if (response.rowCount == 1) {
          console.log(`Estudiante ${estudiante.nombre} insertado con éxito`);
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log(
        `Falta(n) los siguientes parámetros: ${
          argumentosData[0] ? "" : "nombre"
        }, ${argumentosData[1] ? "" : "rut"}, ${
          argumentosData[2] ? "" : "curso"
        }, ${argumentosData[3] ? "" : "nivel"}`,
      );
    }
  }
  async consultarPorRut() {
    const argumentosData = this.arrayComandos.slice(1);
    if (argumentosData[0]) {
      const rut = argumentosData[0];
      try {
        const query = {
          text: "select * from estudiantes where rut = $1",
          values: [rut],
          rowMode: "array",
        };

        const response = await this.pool.query(query);
        if (response.rowCount == 0) {
          console.log("Estudiante no encontrado");
        } else {
          console.log(response.rows);
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log("Debes ingresar un rut");
    }
  }
  async consultarTodosLosEstudiantes() {
    try {
      const response = await this.pool.query({
        text: "select * from estudiantes",
        rowMode: "array",
      });
      if (response.rowCount == 0) {
        console.log("Estudiantes no encontrados");
      } else {
        console.log(response.rows);
      }
    } catch (error) {
      console.log(`Error Code: ${error.code}, Error Message: ${error.message}`);
    }
  }
  async editarEstudiante() {
    const argumentosData = this.arrayComandos.slice(1);

    if (argumentosData.length === 4) {
      const estudiante = {
        nombre: argumentosData[0],
        rut: argumentosData[1],
        curso: argumentosData[2],
        nivel: argumentosData[3],
      };

      try {
        const query = {
          text: "update estudiantes set nombre=$1, rut=$2, curso=$3, nivel=$4 where rut=$2",
          values: [
            estudiante.nombre,
            estudiante.rut,
            estudiante.curso,
            estudiante.nivel,
          ],
        };

        const response = await this.pool.query(query);
        if (response.rowCount == 1) {
          console.log(`Estudiante ${estudiante.nombre} modificado con éxito`);
        }
        if (response.rowCount == 0) {
          console.log("Estudiante no encontrado");
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log(
        `Falta(n) los siguientes parámetros: ${
          argumentosData[0] ? "" : "nombre,"
        } ${argumentosData[1] ? "" : "rut,"} ${
          argumentosData[2] ? "" : "curso,"
        } ${argumentosData[3] ? "" : "nivel"}`,
      );
    }
  }
  async eliminarEstudiantePorRut() {
    const argumentosData = this.arrayComandos.slice(1);
    if (argumentosData[0]) {
      const rut = argumentosData[0];
      try {
        const query = {
          text: "delete from estudiantes where rut = $1",
          values: [rut],
        };

        const response = await this.pool.query(query);
        if (response.rowCount == 0) {
          console.log("Estudiante no encontrado");
        }
        if (response.rowCount == 1) {
          console.log(`Estudiante con rut ${rut} eliminado con éxito`);
        }
      } catch (error) {
        console.log(
          `Error Code: ${error.code}, Error Message: ${error.message}`,
        );
      }
    } else {
      console.log("Debes ingresar un rut");
    }
  }
}
