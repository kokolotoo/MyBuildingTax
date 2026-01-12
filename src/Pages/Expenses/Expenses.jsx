import { useState, useEffect } from "react";
import { useAuthGuard } from '@/Hooks/useAuthGuard'; // ⬅️ НОВ ИМПОРТ
import styles from './expenses.module.css';
import Spinner from "@/Helpers/Spinner";
import { updateData, addNewExpense, getAllExpenses } from "../../Functions/FirebaseFunctions";
import { useSuccessModal } from "@/Hooks/ModalHook";
import ExpenseForm from "@/Component/Expenses/ExpenseForm";
import FilteredExpenses from "@/Component/Expenses/FilteredExpenses";
import MonthSelector from "@/Component/Expenses/MonthSelector";


const getYearMonth = (dateString) => {
    // ... (Вашата логика)
    if (!dateString) return { year: "", month: "" };
    const [datePart] = dateString.split(" ");
    const parts = datePart.split(".");
    const day = parts[0];
    const month = parts[1] ? parts[1].padStart(2, "0") : "";
    const year = parts[2] ? parts[2].replace(/\D/g, "") : "";
    return { year: String(year), month: String(month).padStart(2, "0") };
};

const Expenses = () => {
    // 1. ИЗПОЛЗВАМЕ HOOK-А
    const { dataSettings, setDataSettings, user, isReady } = useAuthGuard();

    const dateNow = new Date().toLocaleString();
    const currentYear = new Date().getFullYear();
    const [choisentYear, setChoisentYear] = useState(String(currentYear));

    const [currentExpense, setCurrentExpense] = useState({
        id: dateNow,
        expenseName: '',
        money: null,
    });

    const { successMessage, contextHolder, confirmModal } = useSuccessModal();
    const [allExpenses, setAllExpenses] = useState([]);

    const [selectedMonth, setSelectedMonth] = useState({
        year: String(currentYear),
        month: String(new Date().getMonth() + 1).padStart(2, "0")
    });

    useEffect(() => {
        setSelectedMonth(prev => ({ ...prev, year: String(choisentYear) }));
    }, [choisentYear]);

    useEffect(() => {
        if (!isReady || !user || !dataSettings) return; // ⬅️ Гарантираме, че всичко е налично

        const getExpense = async () => {
            try {
                const data = await getAllExpenses();
                if (data) setAllExpenses(data);
            } catch (error) {
                console.error('Грешка при зареждане на разходите:', error);
            }
        };

        getExpense();
    }, [isReady, user, dataSettings]); 

    const filteredExpenses = allExpenses.filter(exp => {
        const { year, month } = getYearMonth(exp.id);
        return year === selectedMonth.year && month === selectedMonth.month;
    });

    const addExpense = async (e) => {
        e.preventDefault();

        if (!dataSettings || !user || !user.cashier) {
            alert("Нямате права или липсват настройки.");
            return;
        }

        const confirm = await confirmModal('Потвърдете нов разход!');
        if (!confirm) return;

        const newDataSettings = {
            ...dataSettings,
            money: Number(dataSettings.money) - Number(currentExpense.money || 0),
        };

        setDataSettings(newDataSettings);
        await updateData(newDataSettings);
        await addNewExpense({
            ...currentExpense,
            id: new Date().toLocaleString()
        });
        successMessage("Направен е нов разход!");

        setCurrentExpense({
            id: dateNow,
            expenseName: '',
            money: null,
        });

        const data = await getAllExpenses();
        if (data) setAllExpenses(data);
    };


    if (!isReady || !user || !dataSettings || Object.keys(dataSettings).length === 0) {
      
        return (
            <section className={styles.expense_Page}>
                <Spinner />
            </section>
        );
    }

   

    return (
        <section className={styles.expense_Page}>
            {contextHolder}
           
            <main className={styles.container}>
                <h2>Разходи</h2>
                <p className={styles.current}>
                    Наличност : € <b>{dataSettings.money.toFixed(2)}</b>
                </p>

                {user.cashier && ( 
                    <ExpenseForm
                        setCurrentExpense={setCurrentExpense}
                        addExpense={addExpense}
                        currentExpense={currentExpense}
                    />
                )}

                <p>Избери месец и година на разходи</p>
                <MonthSelector
                    selectedMonth={selectedMonth}
                    setChoisentYear={setChoisentYear}
                    setSelectedMonth={setSelectedMonth}
                    choisentYear={choisentYear}
                    currentYear={currentYear}
                />

                <FilteredExpenses filteredExpenses={filteredExpenses} />
            </main>
        </section>
    );
};

export default Expenses;
