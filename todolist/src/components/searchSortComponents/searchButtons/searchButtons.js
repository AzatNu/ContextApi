import style from "../../../App.module.css";
import { useContext } from "react";
import { searchSortContext } from "../../../context";
export const SearchButtons = () => {
    const {
        setAddInputValue,
        sortButtonClicked,
        setSortButtonClick,
        setRefreshPage,
        refreshPage,
        serchInTODOLIST,
    } = useContext(searchSortContext);
    return (
        <>
            <button
                onClick={() => serchInTODOLIST()}
                className={style["serch-button"]}
            >
                Найти
            </button>
            <button
                onClick={() => {
                    setRefreshPage(!refreshPage);
                    setAddInputValue("");
                }}
                className={style["serch-button"]}
            >
                Сбросить
            </button>
            <button
                onClick={() => setSortButtonClick(!sortButtonClicked)}
                className={style["serch-button"]}
            >
                {sortButtonClicked ? "A — я" : "я — A"}
            </button>
        </>
    );
};
