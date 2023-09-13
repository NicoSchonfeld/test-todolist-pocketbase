"use client";

import React, { useEffect, useState } from "react";
import {
  createTarea,
  deleteTarea,
  getAllTareas,
  getDataUserAuth,
  logOut,
  editTarea,
} from "@/lib/pocketbase";

const Home = () => {
  const [user, setUser] = useState({});
  const [tareas, setTareas] = useState([]);
  const [tareaScheme, setTareaScheme] = useState({
    title: "",
    description: "",
  });
  const [editState, setEditState] = useState(false);
  const [idTarea, setEditTarea] = useState("");

  useEffect(() => {
    getDataUserAuth().then((res) => setUser(res));
    getAllTareas().then((res) => setTareas(res));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setTareaScheme({ ...tareaScheme, [name]: value });
  };

  const handleNewTarea = () => {
    if (tareaScheme.title !== "" && tareaScheme.description !== "") {
      const newObjectTarea = {
        title: tareaScheme.title,
        description: tareaScheme.description,
        idUser: user?.id,
      };
      createTarea(newObjectTarea);
      setTareaScheme({
        title: "",
        description: "",
      });
    } else {
      alert("Llenar campos");
    }
  };

  const handleDeleteTarea = (id) => {
    deleteTarea(id);
  };

  const updateTarea = (dato, id) => {
    setTareaScheme({
      title: dato.title,
      description: dato.description,
    });
    setEditTarea(id);
  };

  const handleSumbitEditTarea = (tareaScheme) => {
    const tareaEdit = {
      title: tareaScheme.title,
      description: tareaScheme.description,
      idUser: user?.id,
    };

    editTarea(idTarea, tareaEdit);
    setEditTarea("");
  };

  return (
    <section className="w-full  py-20 flex items-center justify-center flex-col gap-5">
      <h1>
        Welcome, <span className="font-bold">{user?.username}</span>!{" "}
        <button
          onClick={() => {
            logOut(), location.replace("/");
          }}
          className="text-red-500"
        >
          Logout
        </button>
      </h1>

      <ul>
        {tareas?.map((dato) => (
          <li key={dato.id} className="mb-5">
            <p className="text-xl font-bold">
              {dato.id} - {dato.title}
            </p>
            <p>{dato.description}</p>
            <button
              onClick={() => {
                updateTarea(dato, dato.id), setEditState(true);
              }}
              className="border px-3 py-2 rounded me-3 bg-yellow-500 text-white"
            >
              Edit
            </button>
            <button
              className="border px-3 py-2 rounded bg-red-500 text-white"
              onClick={() => handleDeleteTarea(dato.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <form>
        <input
          type="text"
          name="title"
          value={tareaScheme.title}
          placeholder="Title"
          onChange={handleChange}
          className="border rounded px-3 py-2.5 me-3 focus:outline-green-500"
        />
        <input
          type="text"
          name="description"
          value={tareaScheme.description}
          placeholder="Description"
          onChange={handleChange}
          className="border rounded px-3 py-2.5 me-3 focus:outline-green-500"
        />
      </form>

      {editState ? (
        <>
          <button
            onClick={() => handleSumbitEditTarea(tareaScheme)}
            className="border px-3 py-2.5 bg-green-500 rounded text-white"
          >
            Editar
          </button>

          <button
            onClick={() => {
              setEditState(false),
                setTareaScheme({
                  title: "",
                  description: "",
                });
            }}
            className="border px-3 py-2.5 bg-red-500 rounded text-white"
          >
            Cancelar
          </button>
        </>
      ) : (
        <button
          onClick={() => handleNewTarea()}
          className="border px-3 py-2.5 bg-green-500 rounded text-white"
        >
          Añadir Tarea
        </button>
      )}
    </section>
  );
};

export default Home;
