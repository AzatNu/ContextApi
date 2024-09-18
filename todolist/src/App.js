import style from "./App.module.css";
import {
    errorMessageModalWinowContext,
    searchSortContext,
    updateModalWindowContext,
} from "./context.js";
import { useState, useEffect } from "react";
import {
    useRequestAddTodoModule,
    useRequestDeleteTodoModule,
    useRequestUpdateTodoModule,
    useRequestGetTodoModule,
} from "./hooks";
import { ErrorMessageModalWindow } from "./components/errorMessageWindowComponents/errorMessageModalWinowComponent.js";
import { UpdateModalWindow } from "./components/updateModalWindowComponets/updateModalWindowComponent";
import { SearchSort } from "./components/searchSortComponents/searchSrotComponent.js";

export const App = () => {
    const [TODOLIST, setTODOLIST] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [addInputValue, setAddInputValue] = useState("");
    const [updateInputValue, setUpdateInputValue] = useState("");
    const [refreshPage, setRefreshPage] = useState(false);
    const [sortButtonClicked, setSortButtonClick] = useState(false);
    const [Id, setId] = useState(0);
    const [updateButtonClicked, setUpdateButtonClick] = useState(false);

    useEffect(() => {
        sortTODOLIST();
    }, [sortButtonClicked]);
    const { isLoading } = useRequestGetTodoModule(setTODOLIST, refreshPage);
    const { requestAddTodo, isAdding } = useRequestAddTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage
    );
    const { requestDeleteTodo } = useRequestDeleteTodoModule(setTODOLIST);
    const { requestUpdateTodo } = useRequestUpdateTodoModule(
        TODOLIST,
        setTODOLIST,
        setErrorMessage,
        setRefreshPage,
        refreshPage
    );

    const sortTODOLIST = () => {
        if (!sortButtonClicked) {
            TODOLIST.sort((a, b) => a.title.localeCompare(b.title));
        } else {
            TODOLIST.sort((a, b) => b.title.localeCompare(a.title));
        }
    };

    const serchInTODOLIST = () => {
        if (addInputValue === "") {
            setErrorMessage("Название задачи не может быть пустым");
            return;
        } else {
            const newTODOLIST = TODOLIST.filter((todo) =>
                todo.title
                    .toLowerCase()
                    .trim()
                    .includes(addInputValue.toLowerCase().trim())
            );
            setTODOLIST(newTODOLIST);
        }
    };

    return (
        <div className={style["App"]}>
            {isLoading && <div className={style["loader"]}></div>}
            {errorMessage && (
                <errorMessageModalWinowContext.Provider
                    value={{ errorMessage, setErrorMessage }}
                >
                    <ErrorMessageModalWindow />
                </errorMessageModalWinowContext.Provider>
            )}

            <h1 className={style["title"]}>TODOLIST</h1>
            <div className={style["content"]}>
                <searchSortContext.Provider
                    value={{
                        addInputValue,
                        setAddInputValue,
                        serchInTODOLIST,
                        setRefreshPage,
                        refreshPage,
                        setSortButtonClick,
                        sortButtonClicked,
                        isAdding,
                        requestAddTodo,
                    }}
                >
                    <SearchSort />
                </searchSortContext.Provider>

                {!isLoading && TODOLIST.length === 0 && (
                    <h2 className={style["empty"]}>Задачи отсутствуют</h2>
                )}
                {Object.keys(TODOLIST).map((item, index) => (
                    <div className={style["item"]} key={index}>
                        <button
                            className={style["delete"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Удалить задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                requestDeleteTodo(TODOLIST[item].id);
                                setRefreshPage(!refreshPage);
                            }}
                        >
                            X
                        </button>
                        <button
                            className={style["update"]}
                            onMouseOver={(e) =>
                                (e.currentTarget.title = "Редактировать задачу")
                            }
                            onMouseOut={(e) => (e.currentTarget.title = "")}
                            onClick={() => {
                                setUpdateButtonClick(true);
                                setId(TODOLIST[item].id);
                            }}
                        >
                            &#x270E;
                        </button>
                        {`Задача: ${TODOLIST[item].id}`} —{" "}
                        {TODOLIST[item].title}
                    </div>
                ))}
                <div className={style["buttons"]}>
                    {updateButtonClicked && (
                        <updateModalWindowContext.Provider
                            value={{
                                updateInputValue,
                                setUpdateInputValue,
                                requestUpdateTodo,
                                Id,
                                setUpdateButtonClick,
                                refreshPage,
                                setRefreshPage,
                            }}
                        >
                            <UpdateModalWindow />
                        </updateModalWindowContext.Provider>
                    )}
                </div>
            </div>
        </div>
    );
};
