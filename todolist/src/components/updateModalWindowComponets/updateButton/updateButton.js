import style from "../../../App.module.css";
import { useContext } from "react";
import { updateModalWindowContext } from "../../../context";
export const UpdateButton = () => {
    const {
        updateInputValue,
        setUpdateInputValue,
        requestUpdateTodo,
        setUpdateButtonClick,
        Id,
        setRefreshPage,
        refreshPage,
    } = useContext(updateModalWindowContext);
    return (
        <button
            onClick={() => {
                requestUpdateTodo(updateInputValue, Id);
                setUpdateButtonClick(false);
                setUpdateInputValue("");
                setRefreshPage(!refreshPage);
            }}
            className={style["modal-button"]}
        >
            &#x2714; Обновить
        </button>
    );
};
