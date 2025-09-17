import { useState, useEffect } from "react";
import { NewTaskForm, Task, BaseCard } from "./";
import {
  getAllTasks,
  getList,
  updateList,
  deleteList,
  deleteListImage,
} from "../services/apiSwitcher";

function List({ id }) {
  const [list, setList] = useState({});
  const [tasks, setTasks] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // Fetch list + tasks
  useEffect(() => {
    const fetchData = async () => {
      try {
        const isMock = process.env.REACT_APP_USE_MOCK === "true";

        const res = await getList(id);
        setList({
          ...res,
          image: res.image
            ? isMock
              ? res.image
              : `${process.env.REACT_APP_API_URL}${res.image}`
            : null,
        });
      } catch (error) {
        console.error("Errore fetch List:", error);
      }

      try {
        const tasksRes = await getAllTasks(id);
        setTasks(tasksRes);
      } catch (error) {
        console.error("Errore fetch Tasks:", error);
      }
    };
    fetchData();
  }, [id]);

  // Update list name
  const handleUpdate = async (newName) => {
    try {
      await updateList(id, { name: newName || "New List" });
      setList((prev) => ({ ...prev, name: newName || "New List" }));
    } catch (error) {
      console.error("Update list error:", error);
    }
  };

  // Delete list
  const handleDeleteList = async () => {
    try {
      await deleteList(id);
      setList(null);
    } catch (error) {
      console.error("Error List delete:", error);
    }
  };

  // Delete list image
  const handleDeleteImage = async () => {
    try {
      await deleteListImage(id);
      setList((prev) => ({ ...prev, image: null }));
    } catch (error) {
      console.error("Error List image delete:", error);
    }
  };

  // Add new task to local state
  const handleCreateTask = (task) => {
    setTasks((next) => [task, ...next]);
  };

  if (!list) return null;

  return (
    <BaseCard
      listId={id}
      image={list.image}
      listName={list.name}
      edit={editMode}
      setEdit={setEditMode}
      handleUpdate={handleUpdate}
      onDeleteImage={handleDeleteImage}
      onDeleteList={handleDeleteList}
      onImageUploaded={(uploadedImage) =>
        setList((prev) => ({ ...prev, image: uploadedImage }))
      }
    >
      <NewTaskForm listId={id} addTask={handleCreateTask} />
      {tasks.map((task, index) => {
        return (
          <Task
            key={task.taskId || index}
            id={task.taskId || index}
            listId={list.listId || id}
            editMode={editMode}
          />
        );
      })}
    </BaseCard>
  );
}

export default List;
