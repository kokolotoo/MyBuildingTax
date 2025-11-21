import { useState, useEffect } from "react";
import Navbar from "../../Component/Navbar/NavBar";
import Spinner from "../../Helpers/Spinner";
import styles from './monthTax.module.css'
import { getAllApartments } from "../../Functions/Apartmets";
import { useCalculateMonthTax } from "../../Hooks/CalculateMothTax";


const MontTax = () => {

    const [allApartments, setAllApartments] = useState(null)
    const [taxPerMonth, setTaxPerMonth] = useState(null)
    const { monthTax } = useCalculateMonthTax()

    useEffect(() => {
        const getData = async () => {
            const result = await getAllApartments()
            setAllApartments(result)
        }
        getData()

    }, [])




    return (
        <div>
            <Navbar />

            {allApartments ?
                <section>

                </section>
                :
                (<Spinner />)
            }

        </div>
    );
}

export default MontTax;
