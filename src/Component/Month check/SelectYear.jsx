import styles from '@/Pages/Mont Tax/monthTax.module.css'

const SelectYear = ({ setChoisentYear, currentYear }) => {

    const years = [currentYear - 1, currentYear, currentYear + 1]; // 2024, 2025,

    return (
        <div className={styles.choiceYear}>
            {years.map(y => (
                <button key={y}

                    onClick={() => setChoisentYear(y)}>
                    {y}г.
                </button>
            ))}
        </div>

    )
}

export default SelectYear
