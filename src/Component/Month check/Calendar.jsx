import React from 'react'
import styles from '../../Pages/Mont Tax/monthTax.module.css'

const Calendar = ({
    selectedMonth, MONTHS_BG, setSelectedMonth,
    hasPayment, apartments, user,
}) => {
    return (
        <>
            {!selectedMonth && (
                <section className={styles.monthGrid}>
                    {MONTHS_BG.map(month => {
                        const unpaid = apartments
                            .filter(ap => ap.people > 0 && !hasPayment(ap, month))
                            .map(ap => ap.apartment);


                        return (
                            <div
                                key={month}
                                className={styles.monthBox}
                                onClick={
                                    user.cashier ?
                                        () => setSelectedMonth(month) : null
                                }
                            >
                                <h3>{month}</h3>
                                {unpaid.length === 0 ? (
                                    <p className={styles.allPaid}>Всички са платили ✔</p>
                                ) : (
                                    <div>
                                        <p className={styles.unpaidList}>
                                            Неплатили:
                                        </p>
                                        <p className={styles.unpaidList} >
                                            {unpaid.join(", ")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </section>
            )}
        </>
    )
}

export default Calendar
