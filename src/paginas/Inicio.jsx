import { useState, useEffect } from "react";
import Cliente from "../components/Cliente";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const obtenerClientesAPI = async () => {
      try {
        const url = "http://localhost:7000/clientes";
        const respuesta = await fetch(url); //Con get no es necesario especificar el metodo
        const resultado = await respuesta.json();

        setClientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };

    obtenerClientesAPI();
  }, []); // arreglo vacio para que se ejecute una vez. Una Vez que el componente este listo

  const handleEliminar = async (id) =>{
    const confirmar = confirm('Deseas eliminar este cliente?')

    if(confirmar){
      try {
        const url = `http://localhost:7000/clientes/${id}`
        const respuesta = await fetch(url, {
          method: 'DELETE'
        })

        await respuesta.json()
        
      } catch (error) {
        
      }

      const arrayCliente = clientes.filter(cliente => (cliente.id != id) )
      setClientes(arrayCliente)

    }
    
  }

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">
        Administra tus clientes
      </p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {clientes.map(cliente =>(
            <Cliente 
            key={cliente.id}
            cliente={cliente}
            handleEliminar={handleEliminar}
            />

          ))}

        </tbody>
      </table>
    </>
  );
};

export default Inicio;

//w-full -> toma todo el tamano de la pantalla
//table-auto -> para que haga resize cuando se cambie de tamano