import styles from '@/Pages/Mont Tax/monthTax.module.css'

const SelectYear = ({ setChoisentYear, currentYear, choiceYear }) => {

    const years = [currentYear - 1, currentYear, currentYear + 1]; // 2024, 2025,

    return (
        <div className={styles.choiceYear}>
            {years.map(y => (
                <button
                    key={y}
                    className={y === choiceYear ? styles.active : ''} /* Добавяне на клас active */
                    onClick={() => setChoisentYear(y)}
                >
                    {y}г.
                </button>
            ))}
        </div>

    )
}

export default SelectYear
