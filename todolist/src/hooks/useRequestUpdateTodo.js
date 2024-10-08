export const useRequestUpdateTodoModule = (
    TODOLIST,
    setTODOLIST,
    setErrorMessage,
    setRefreshPage,
    refreshPage
) => {
    const requestUpdateTodo = (updatedValue, id) => {
        if (updatedValue === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else if (
            TODOLIST.find((item) => item.title.trim() === updatedValue.trim())
        ) {
            setErrorMessage("Задача с таким названием уже существует");
            return;
        } else {
            fetch(`http://localhost:3005/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: updatedValue,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    setTODOLIST((lastState) => {
                        return lastState.map((item) => {
                            if (item.id === id) {
                                return data;
                            } else {
                                return item;
                            }
                        });
                    });
                })
                .finally(() => {
                    setRefreshPage(!refreshPage);
                });
        }
    };
    return {
        requestUpdateTodo,
    };
};
