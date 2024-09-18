import style from "../../../App.module.css";
import { useContext } from "react";
import { updateModalWindowContext } from "../../../context";
export const CloseButton = () => {
    const { setUpdateButtonClick } = useContext(updateModalWindowContext);
    return (
        <button
            onClick={() => {
                setUpdateButtonClick(false);
            }}
            className={style["modal-button"]}
        >
            &#x2716; Закрыть
        </button>
    );
};
