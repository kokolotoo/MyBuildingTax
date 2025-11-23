import { useState, useContext, useEffect } from "react"
import DataContext from "../../Context/DataContext"
import Navbar from "../../Component/Navbar/NavBar"
import styles from './expenses.module.css'
import Spinner from "../../Helpers/Spinner"
import { updateData, addNewExpense, getAllExpenses } from "../../Functions/FirebaseFunctions"
import { useSuccessModal } from "../../Hooks/ModalHook"
import ExpenseForm from "../../Component/Expenses/ExpenseForm"

const Expenses = () => {
    const date = new Date().toLocaleString()
    const { dataSettings, setDataSettings, user } = useContext(DataContext)
    const [currentExpense, setCurrentExpense] = useState({
        id: date,
        expenseName: '',
        money: null
    })
    const { successMessage, contextHolder, confirmModal } = useSuccessModal()
    const [allExpenses, setAllExpenses] = useState([])

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

    const addExpense = async (e) => {
        e.preventDefault()
        const confirm = await confirmModal('Потвърдете нов разход!')
        if (confirm) {
            const newDataSettings = {
                ...dataSettings,
                money: dataSettings.money - currentExpense.money
            }

            setDataSettings(newDataSettings);
            await updateData(newDataSettings);
            await addNewExpense(currentExpense);
            successMessage("Направен е нов разход!");
        }
        setCurrentExpense({
            id: date,
            expenseName: '',
            money: null
        })
    }

    return (
        <section className={styles.expense_Page}>
            {contextHolder}
            <Navbar />
            {dataSettings && Object.keys(dataSettings).length > 0 ?

                <main className={styles.container}>
                    <h2>Разходи</h2>
                    <p className={styles.current}>Наличност : € <b>{dataSettings.money}</b></p>

                    {user?.cashier && <ExpenseForm
                        setCurrentExpense={setCurrentExpense}
                        addExpense={addExpense}
                        currentExpense={currentExpense}
                    />}

                    {allExpenses.length ? (
                        <div className={styles.expensesContainer}>
                            {allExpenses.map(item =>
                                <div key={item.id} className={styles.singleExpense}>
                                    <i>Направен на: {item.id}</i>
                                    <i>Направен за: {item.expenseName}</i>
                                    <i>Разход: € {item.money}</i>
                                </div>
                            )}
                        </div>)
                        :
                        <p className={styles.noExpensesTitle}>Няма направени разходи !</p>
                    }
                </main>
                :
                <Spinner />}


        </section>
    )
}

export default Expenses
