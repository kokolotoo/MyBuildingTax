import React from 'react'
import styles from './myApartment.module.css'
import Navbar from '../../Component/Navbar/NavBar'
import { useState, useContext, useEffect } from 'react'
import DataContext from '../../Context/DataContext'
import { getSingleApartment } from '../../Functions/Apartmets'
import Spinner from '../../Helpers/Spinner'


const MyApartment = () => {
  const { user } = useContext(DataContext)
  const [dataApartment, setDataApartment] = useState(null)

  useEffect(() => {
    const getData = async () => {
      const data = await getSingleApartment(user.user)
      setDataApartment(data)
      console.log(data);
    }
    getData()
  }, [user])



  return (
    <section className={styles.apartment_data}>
      <Navbar />

      <section className={styles.bg_box}>
        {dataApartment ? (
          <div>

            <h2>Данни за апартамент: {dataApartment.apartment}</h2>
            <p>Титуляр : <span>{dataApartment.owner}</span></p>
            <p>Таксувани жители: <span>{dataApartment.people}</span></p>


            <p>{
              dataApartment.year ? 'нямаш снимки' : 'Имаш снимки'}</p>
          </div>

        ) : (
          <Spinner />
        )}
      </section>
    </section>
  );


}

export default MyApartment
