import { useState, useContext, useEffect } from "react";
import DataContext from "../../Context/DataContext";
import Navbar from "../../Component/Navbar/NavBar";
import styles from './expenses.module.css';
import Spinner from "../../Helpers/Spinner";
import { updateData, addNewExpense, getAllExpenses } from "../../Functions/FirebaseFunctions";
import { useSuccessModal } from "../../Hooks/ModalHook";
import ExpenseForm from "../../Component/Expenses/ExpenseForm";
import FilteredExpenses from "../../Component/Expenses/FilteredExpenses";
import MonthSelector from "../../Component/Expenses/MonthSelector";

// Помощна функция за парсване на дата от твоя формат "26.11.2025 г., 19:24:26 ч."
const getYearMonth = (dateString) => {
    // Очакваме нещо като: "26.11.2025 г., 19:24:26 ч."
    if (!dateString) return { year: "", month: "" };
    const [datePart] = dateString.split(" ");
    const parts = datePart.split(".");
    const day = parts[0];
    const month = parts[1] ? parts[1].padStart(2, "0") : "";
    // премахваме евентуален " г," или неща, но в случая year е parts[2]
    const year = parts[2] ? parts[2].replace(/\D/g, "") : "";
    return { year: String(year), month: String(month).padStart(2, "0") };
};

const Expenses = () => {
    const dateNow = new Date().toLocaleString();
    const { dataSettings, setDataSettings, user } = useContext(DataContext);
    const currentYear = new Date().getFullYear();
    const [choisentYear, setChoisentYear] = useState(String(currentYear));

    const [currentExpense, setCurrentExpense] = useState({
        id: dateNow,
        expenseName: '',
        money: null,
    });

    const { successMessage, contextHolder, confirmModal } = useSuccessModal();
    const [allExpenses, setAllExpenses] = useState([]);

    // selectedMonth държи месец и година (стрингове)
    const [selectedMonth, setSelectedMonth] = useState({
        year: String(currentYear),
        month: String(new Date().getMonth() + 1).padStart(2, "0")
    });

    // Синхронизираме избраната година от SelectYear с selectedMonth.year
    useEffect(() => {
        setSelectedMonth(prev => ({ ...prev, year: String(choisentYear) }));
    }, [choisentYear]);

    // Зареждане на всичките разходи
    useEffect(() => {
        const getExpense = async () => {
            try {
                const data = await getAllExpenses();
                if (data) setAllExpenses(data);
            } catch (error) {
                console.error('Грешка при зареждане на разходите:', error);
            }
        };

        getExpense();
    }, []);

    // Филтриране по избран месец и година
    const filteredExpenses = allExpenses.filter(exp => {
        const { year, month } = getYearMonth(exp.id);
        return year === selectedMonth.year && month === selectedMonth.month;
    });

    const addExpense = async (e) => {
        e.preventDefault();
        const confirm = await confirmModal('Потвърдете нов разход!');
        if (!confirm) return;

        // защита
        if (!dataSettings) {
            alert("Липсват настройки.");
            return;
        }

        const newDataSettings = {
            ...dataSettings,
            money: Number(dataSettings.money) - Number(currentExpense.money || 0),
        };

        setDataSettings(newDataSettings);
        await updateData(newDataSettings);
        await addNewExpense({
            ...currentExpense,
            id: new Date().toLocaleString() // задаваме актуална дата/час като id
        });
        successMessage("Направен е нов разход!");

        // Изчистваме формата
        setCurrentExpense({
            id: dateNow,
            expenseName: '',
            money: null,
        });

        // Презареждаме списъка с разходи (или можеш да го държиш локално)
        const data = await getAllExpenses();
        if (data) setAllExpenses(data);
    };

    if (!dataSettings || Object.keys(dataSettings).length === 0) {
        return (
            <section className={styles.expense_Page}>
                <Navbar />
                <Spinner />
            </section>
        );
    }

    return (
        <section className={styles.expense_Page}>
            {contextHolder}
            <Navbar />

            <main className={styles.container}>
                <h2>Разходи</h2>
                <p className={styles.current}>
                    Наличност : € <b>{dataSettings.money}</b>
                </p>

                {/* Форма за нов разход (само ако е касиер) */}
                {user?.cashier && (
                    <ExpenseForm
                        setCurrentExpense={setCurrentExpense}
                        addExpense={addExpense}
                        currentExpense={currentExpense}
                    />
                )}

                {/* СЕЛЕКТОР: МЕСЕЦ + ГОДИНА (ползваме твоя SelectYear) */}
                <p>Избери месец и година на разходи</p>
                <MonthSelector
                    selectedMonth={selectedMonth}
                    setChoisentYear={setChoisentYear}
                    setSelectedMonth={setSelectedMonth}
                    choisentYear={choisentYear}
                    currentYear={currentYear}
                    
                />
              

                {/* СПИСЪК С РАЗХОДИ */}
                <FilteredExpenses filteredExpenses={filteredExpenses} />
            </main>
        </section>
    );
};

export default Expenses;

