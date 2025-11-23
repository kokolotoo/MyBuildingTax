import { useState, useEffect, useContext } from "react";
import Navbar from "../../Component/Navbar/NavBar";
import Spinner from "../../Helpers/Spinner";
import styles from "./monthTax.module.css";
import { getAllApartments } from "../../Functions/Apartmets";
import SignaturePad from "../../Canvas/Canvas";
import DataContext from "../../Context/DataContext";
import { useCalculateMonthTax } from "../../Hooks/CalculateMothTax";
import { useSuccessModal } from "../../Hooks/ModalHook";
import Calendar from "../../Component/Month check/Calendar";
import CurrentMonth from "../../Component/Month check/CurrentMonth";
import SelectYear from "../../Component/Month check/SelectYear";


const MONTHS_BG = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MontTax = () => {

    const [apartments, setApartments] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);  // ← кликнат месец
    const [signatureFor, setSignatureFor] = useState(null);     // ← апартамент за подпис
    const { user, dataSettings, setDataSettings } = useContext(DataContext)
    const { monthTax } = useCalculateMonthTax()
    const { successMessage, contextHolder } = useSuccessModal()
    const currentYear = new Date().getFullYear();
    const [choisentYear, setChoisentYear] = useState(currentYear)

    const successPay = () => {
        getAllApartments().then(setApartments);
        successMessage(`Успешно плащане ап. ${signatureFor.apartment}!`)
    }

    useEffect(() => {
        const load = async () => {
            const data = await getAllApartments();
            setApartments(data);
        };
        load();


    }, []);

    // Проверява дали апартамент има файл за даден месец
    const hasPayment = (apt, monthName) => {
        if (!Array.isArray(apt.year)) return false;

        return apt.year.some(url =>
            typeof url === "string" &&
            url.includes(`${choisentYear}_${monthName}_${apt.apartment}`)
        );
    };

    if (!apartments || !user || !dataSettings) return <Spinner />;

    return (
        <div className={styles.container}>
            {contextHolder}
            <Navbar />
            
            <SelectYear
                setChoisentYear={setChoisentYear}
                currentYear={currentYear}
            />

            <h2 className={styles.title}>Таксуване – {choisentYear}</h2>

            {/* -----------  КАЛЕНДАР 12 МЕСЕЦА -----------*/}
            <Calendar
                selectedMonth={selectedMonth}
                MONTHS_BG={MONTHS_BG}
                setSelectedMonth={setSelectedMonth}
                hasPayment={hasPayment}
                apartments={apartments}
                user={user}
            />

            {/* -----------  ДЕТАЙЛИ ЗА ИЗБРАН МЕСЕЦ ----------- */}
            <CurrentMonth
                selectedMonth={selectedMonth}
                signatureFor={signatureFor}
                setSelectedMonth={setSelectedMonth}
                apartments={apartments}
                monthTax={monthTax}
                hasPayment={hasPayment}
                setSignatureFor={setSignatureFor}
            />
            {/* ----------- SIGNATURE POPUP ----------- */}
            {signatureFor && (
                <div className={styles.overlay}>
                    <div className={styles.sigContainer}>
                        <h3>
                            Плащане за {signatureFor.month} — Апартамент {signatureFor.apartment}
                        </h3>
                        <SignaturePad
                            apartNumber={signatureFor.apartment} // номер на апартамента
                            monthName={signatureFor.month}       // името на месеца
                            year={choisentYear}                   // текущата година
                            apartmentId={signatureFor.id}        // ID на апартамента в Supabase
                            onClose={() => setSignatureFor(null)} // функция за скриване
                            onSuccess={successPay}
                            money={signatureFor.money}
                            dataSettings={dataSettings}
                            setDataSettings={setDataSettings}
                        />

                    </div>
                </div>
            )}
            
        </div>
    );
};

export default MontTax;
