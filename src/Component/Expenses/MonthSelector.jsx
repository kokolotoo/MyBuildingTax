import React from 'react'
import styles from '@/Pages/Expenses/expenses.module.css'
import SelectYear from '../Month check/SelectYear'

const MonthSelector = ({
    selectedMonth, setChoisentYear,setSelectedMonth,
    choisentYear, currentYear
}) => {
  return (
      <div className={styles.monthSelector}>

          <select
              value={selectedMonth.month}
              onChange={(e) =>
                  setSelectedMonth(prev => ({ ...prev, month: e.target.value }))
              }
          >
              {Array.from({ length: 12 }).map((_, i) => {
                  const m = String(i + 1).padStart(2, "0");
                  return <option key={m} value={m}>{m}</option>;
              })}
          </select>

          <div className={styles.yearSelector}>
              <select
                  value={choisentYear}
                  onChange={(e) => setChoisentYear(Number(e.target.value))}
              >
                  <option value={currentYear - 1}>{currentYear - 1} г.</option>
                  <option value={currentYear}>{currentYear} г.</option>
                  <option value={currentYear + 1}>{currentYear + 1} г.</option>
              </select>

              {/* скриваме оригиналните бутони */}
              <div style={{ display: "none" }}>
                  <SelectYear
                      setChoisentYear={setChoisentYear}
                      currentYear={currentYear}
                  />
              </div>
          </div>

      </div>

  )
}

export default MonthSelector
