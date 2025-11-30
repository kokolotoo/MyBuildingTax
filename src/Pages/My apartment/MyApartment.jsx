import styles from './myApartment.module.css'
import { useState, useContext, useEffect } from 'react'
import DataContext from '@/Context/DataContext'
import { getSingleApartment } from '@/Functions/Apartmets'
import Spinner from '../../Helpers/Spinner'
import { useCalculateMonthTax } from '@/Hooks/CalculateMothTax'
import SelectYear from '@/Component/Month check/SelectYear'

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MyApartment = () => {
  const { user, dataSettings } = useContext(DataContext)
  const [dataApartment, setDataApartment] = useState(null)
  const [taxPerMonth, setTaxPerMonth] = useState(null)
  const { monthTax } = useCalculateMonthTax()
  const currentYear = new Date().getFullYear()
  const [choiceYear, setChoiceYear] = useState(currentYear)

  useEffect(() => {
    const getData = async () => {
      const data = await getSingleApartment(user?.user)
      const totalTax = monthTax(data?.apartment, data?.people)
      setDataApartment(data)
      setTaxPerMonth(totalTax)
    }
    getData()
  }, [user])

  if (!dataApartment) return <Spinner />

  const renderMonthPayment = (month) => {
    const paymentUrl = dataApartment.year?.find(url =>
      url.includes(`${choiceYear}_${month}_${dataApartment.apartment}`)
    )
    if (paymentUrl) {
      return <a href={paymentUrl} target="_blank" rel="noreferrer" className={styles.paid}>✔ Платено</a>
    } else {
      return <span className={styles.unpaid}>❌ Неплатено</span>
    }
  }

  return (
    <section className={styles.apartment_data}>

      <section className={styles.bg_box}>
        <div>
          <h2>Данни за апартамент: {dataApartment.apartment}</h2>
          <p>Титуляр : <span>{dataApartment.owner}</span></p>
          <p>Телефон : <span>{dataApartment.phone? dataApartment.phone : 'Няма  номер'}</span></p>
          <p>Таксувани жители: <span>{dataApartment.people}</span></p>
          <p>Месечна такса: <span> € {taxPerMonth}</span></p>
        </div>
      </section>
      
      <SelectYear setChoisentYear={setChoiceYear} currentYear={currentYear} />

      <h3>Плащания за {choiceYear}</h3>

      <div className={styles.monthList}>
        {MONTHS.map(month => (
          <div key={month} className={styles.monthRow}>
            <span className={styles.monthName}>{month}</span>
            <span className={styles.monthStatus}>{renderMonthPayment(month)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyApartment

