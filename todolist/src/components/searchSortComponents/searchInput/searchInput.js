import style from "../../../App.module.css";
import { useContext } from "react";
import { searchSortContext } from "../../../context";
export const SearchInput = () => {
    const { addInputValue, setAddInputValue } = useContext(searchSortContext);
    return (
        <input
            className={style["search-input"]}
            placeholder="Найти задачу или добавить её"
            type="text"
            value={addInputValue}
            onChange={(e) => setAddInputValue(e.target.value)}
        />
    );
};
