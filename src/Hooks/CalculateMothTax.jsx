import { useContext } from "react";
import DataContext from "../Context/DataContext";

export const useCalculateMonthTax = () => {

    const { dataSettings } = useContext(DataContext);

    const monthTax = (apartment, people) => {
        const lowTax = dataSettings?.lowTax ?? 3.5;
        const highTax = dataSettings?.hightTax ?? 7.5;

        const taxPerPerson = apartment <= 6 ? lowTax : highTax;

        return taxPerPerson * people;
    };

    return { monthTax };
};
