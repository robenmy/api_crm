import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Alerta from "./Alerta";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";

const Formulario = ({ cliente, cargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    empresa: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no valido")
      .required("El email es obligatorio"),
    telefono: Yup.number()
      .typeError("El numero no es valido")
      .positive("Numero no valido")
      .integer("Numero no valido"),
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      let respuesta;
      if (cliente.id) {
        // Editando un registro---------------------------------
        const url = `http://localhost:7000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values), // para convertir objeto a string
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // Nuevo Registro ----------------------------------------
        const url = "http://localhost:7000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values), // para convertir objeto a string
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      resultado = await respuesta.json(); // para que retorne la respuesta com json
      navigate("/clientes"); //redireccionar al usuario a otra url
    } catch (error) {}
  };
  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase">
        {cliente?.nombre ? "Editar Cliente" : "Agregar Clientes"}
      </h1>

      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "", // si no esta presente cliente nombre sera un string vacio
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true} // permite a formik obtener valores de una API, necesario para iniciar los valores anteriores
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values); // await para indicarle que espera a que la funcion se complete
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          console.log(errors);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="nombre">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  name="nombre"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                />
                {errors.nombre && touched.nombre ? (
                  <Alerta>{errors.nombre}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="empresa">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  name="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                />
                {errors.empresa && touched.empresa ? (
                  <Alerta>{errors.empresa}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="Empresa">
                  E-mail
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del cliente"
                />
                {errors.email && touched.email ? (
                  <Alerta>{errors.email}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="Empresa">
                  Telefono
                </label>
                <Field
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="telefono del cliente"
                />
                {errors.telefono && touched.telefono ? (
                  <Alerta>{errors.telefono}</Alerta>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="Empresa">
                  Notas
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  name="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 h-40"
                  placeholder="notas del cliente"
                />
              </div>

              <input
                type="submit"
                value={cliente?.nombre ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white
          uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  cliente: {},
  cargando: false, // si no esta presente el valor cargando que tome false por defecto
};

export default Formulario;
