import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Formulario from "../components/Formulario";

const EditarCliente = () => {
  const { id } = useParams(); // para obtener el id de la url
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // setCargando(!cargando);
    const obtenerCliente = async () => {
      try {
        const url = `http://localhost:7000/clientes/${id}`;

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setCliente(resultado);
      } catch (error) {
        console.log(error);
      }
      setTimeout(() => {
        setCargando(!cargando);
      }, 300);
    };
    obtenerCliente();
  }, []);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente
      </p>
      {cliente.nombre ? (
        <Formulario cliente={cliente} cargando={cargando} />
      ) : (
        ""
      )}
    </>
  );
};

export default EditarCliente;
