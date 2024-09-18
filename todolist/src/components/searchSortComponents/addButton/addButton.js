import style from "../../../App.module.css";
import { useContext } from "react";
import { searchSortContext } from "../../../context";
export const AddButton = () => {
    const {
        addInputValue,
        setAddInputValue,
        requestAddTodo,
        isAdding,
        setRefreshPage,
        refreshPage,
    } = useContext(searchSortContext);
    return (
        <button
            onMouseOver={(e) => (e.currentTarget.title = "Добавить задачу")}
            onMouseOut={(e) => (e.currentTarget.title = "")}
            disabled={isAdding}
            onClick={() => {
                requestAddTodo(addInputValue);
                setRefreshPage(!refreshPage);
                setAddInputValue("");
            }}
            className={style["add"]}
        >
            +
        </button>
    );
};
