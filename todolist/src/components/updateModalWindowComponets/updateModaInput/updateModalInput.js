import style from "../../../App.module.css";
import { useContext } from "react";
import { updateModalWindowContext } from "../../../context";
export const UpdateModaInput = () => {
    const { updateInputValue, setUpdateInputValue } = useContext(
        updateModalWindowContext
    );

    return (
        <input
            placeholder="Новый текст для задачи"
            className={style["modal-input"]}
            type="text"
            value={updateInputValue}
            onChange={(e) => setUpdateInputValue(e.target.value)}
        />
    );
};
