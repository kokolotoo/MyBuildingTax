import { Input } from 'antd'
import styles from '@/Pages/Expenses/expenses.module.css'

const ExpenseForm = ({
    setCurrentExpense,
    addExpense, currentExpense
}) => {

    const onChange = (e) => {
        setCurrentExpense(prev => ({
            ...prev,
            expenseName: e.target.value
        }));
    };


    const onchangeMoney = (e) => {
        const sanitizedValue = e.target.value.replace(',', '.');
        if (/^\d*\.?\d*$/.test(sanitizedValue)) {
            setCurrentExpense(prev => ({
                ...prev,
                money: sanitizedValue
            }));
        }
    };

    return (
        <form
            action="Expenses" className={styles.expensForm}
            onSubmit={addExpense}
        >

            <Input
                type="text"
                placeholder="Разход за..."
                value={currentExpense.expenseName}
                onChange={onChange}
                required
            />

            <Input
                type="text"
                inputMode="decimal"
                placeholder="Сума"
                value={currentExpense.money}
                style={{ width: '10em' }}
                onChange={onchangeMoney}
                required
            />
            <button type="submit">Въведи</button>
        </form>
    )
}

export default ExpenseForm
