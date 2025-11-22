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

const MONTHS_BG = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const MontTax = () => {
    const [apartments, setApartments] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);  // ← кликнат месец
    const [signatureFor, setSignatureFor] = useState(null);     // ← апартамент за подпис
    const { user } = useContext(DataContext)
    const currentYear = new Date().getFullYear();
    const { monthTax } = useCalculateMonthTax()
    const { successMessage, contextHolder } = useSuccessModal()

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
            url.includes(`${currentYear}_${monthName}_${apt.apartment}`)
        );
    };

    if (!apartments) return <Spinner />;

    return (
        <div className={styles.container}>
            {contextHolder}
            <Navbar />
            <h2 className={styles.title}>Месечни плащания – {currentYear}</h2>

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
                            year={currentYear}                   // текущата година
                            apartmentId={signatureFor.id}        // ID на апартамента в Supabase
                            onClose={() => setSignatureFor(null)} // функция за скриване
                            onSuccess={() => {
                                // 🚀 Презарежда апартаментите след плащане!
                                getAllApartments().then(setApartments);
                                successMessage(`Успешно плащане ап. ${signatureFor.apartment}!`)
                            }}
                        />

                    </div>
                </div>
            )}
        </div>
    );
};

export default MontTax;
