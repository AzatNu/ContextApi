import style from "../../../App.module.css";
import { useContext } from "react";
import { errorMessageModalWinowContext } from "../../../context";
export const ErrorMessageWindow = () => {
    const { errorMessage, setErrorMessage } = useContext(
        errorMessageModalWinowContext
    );
    return (
        <div className={style["errorWindow"]}>
            <h2>{errorMessage}</h2>
            <button
                onClick={() => setErrorMessage("")}
                className={style["closeErrorWindow"]}
            >
                OK
            </button>
        </div>
    );
};
