import React from 'react'
import styles from '../../Pages/Mont Tax/monthTax.module.css'

const CurrentMonth = ({
    selectedMonth, signatureFor, setSelectedMonth,
    apartments, monthTax, hasPayment, setSignatureFor
}) => {



    return (
        <>
            {selectedMonth && !signatureFor && (
                <section className={styles.monthDetails}>
                    <button
                        className={styles.backBtn}
                        onClick={() => setSelectedMonth(null)}
                    >
                        ← Назад
                    </button>

                    <h2 className={styles.selectedMonth}>{selectedMonth} – Детайли</h2>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Титуляр</th>
                                <th>Такса</th>
                                <th>Статус</th>
                                <th>Плати</th>
                            </tr>
                        </thead>

                        <tbody>
                            {apartments.map(apt => {
                                const paid = hasPayment(apt, selectedMonth);
                                const tax = monthTax(apt.apartment, apt.people)
                                return (
                                    <tr key={apt.id}>
                                        <td>{apt.apartment}</td>
                                        <td>{apt.owner}</td>
                                        <td> € {tax}</td>
                                        <td>
                                            {paid ? (
                                                <span className={styles.paid}>✔ </span>
                                            ) : (
                                                <span className={styles.unpaid}>❌</span>
                                            )}
                                        </td>

                                        <td>
                                            {(apt.people > 0 && !paid) ? (
                                                <button
                                                    className={styles.payBtn}
                                                    onClick={() =>
                                                        setSignatureFor({
                                                            month: selectedMonth,
                                                            apartment: apt.apartment,
                                                            id: apt.id,
                                                            money:Number(tax)
                                                        })
                                                    }
                                                >
                                                    Плати
                                                </button>
                                            ) : (
                                                <span className={styles.noPayment}>—</span> // или просто оставяш празно
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </section>
            )}
        </>
    )
}

export default CurrentMonth
