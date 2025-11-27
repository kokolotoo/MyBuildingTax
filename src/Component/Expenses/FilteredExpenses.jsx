import React from 'react'
import styles from '../../Pages/Expenses/expenses.module.css'

const FilteredExpenses = ({filteredExpenses}) => {
  return (
    <>
        {filteredExpenses.length ? (
                          <div className={styles.expensesContainer}>
                              {filteredExpenses.map(item => (
                                  <div key={item.id} className={styles.singleExpense}>
                                      <i>Направен на: {item.id}</i>
                                      <i>Направен за: {item.expenseName}</i>
                                      <i>Разход: € {item.money}</i>
                                  </div>
                              ))}
                          </div>
                      ) : (
                          <p className={styles.noExpensesTitle}>
                              Няма разходи за избрания месец!
                          </p>
                      )}
    </>
  )
}

export default FilteredExpenses
