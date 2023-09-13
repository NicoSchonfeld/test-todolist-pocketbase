import PocketBase from "pocketbase";

const url_pocketbase = "http://127.0.0.1:8090";
export const pb = new PocketBase(url_pocketbase);

export const createUser = async (userScheme) => {
  try {
    const res = await pb.collection("users").create(userScheme);

    console.log(`Welcome, ${res.username}!`);
  } catch (error) {
    console.error(error);
  }
};

export const authUser = async (userScheme) => {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(userScheme.email, userScheme.password);

    console.log(authData);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = () => {
  pb.authStore.clear();
};

export const getDataUserAuth = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const userData = await pb
        .collection("users")
        .getOne(pb.authStore.model.id, {
          expand: "relField1,relField2.subRelField",
        });

      return userData;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllTareas = async () => {
  try {
    if (pb?.authStore?.isValid) {
      const allTareas = await pb.collection("tareas").getFullList({
        sort: "-created",
      });

      const filterTareas = allTareas.filter(
        (tarea) => tarea?.idUser === pb?.authStore?.model?.id
      );

      return filterTareas;
    }
  } catch (error) {
    console.log;
  }
};

export const createTarea = async (tareaScheme) => {
  try {
    if (pb?.authStore?.isValid) {
      const createTareas = await pb.collection("tareas").create(tareaScheme);

      /* console.log(createTareas); */
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteTarea = async (id) => {
  try {
    if (pb?.authStore?.isValid) {
      await pb.collection("tareas").delete(id);
    }
  } catch (error) {
    console.log(error);
  }
};

export const editTarea = async (idTarea, tareaEdit) => {
  try {
    if (pb?.authStore?.isValid) {
      const deleteT = await pb.collection("tareas").update(idTarea, tareaEdit);

      console.log(deleteT);
    }
  } catch (error) {
    console.error(error);
  }
};
