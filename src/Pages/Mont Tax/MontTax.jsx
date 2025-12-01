import { useState, useEffect } from "react";
import { useAuthGuard } from '@/Hooks/useAuthGuard'; // ⬅️ НОВ ИМПОРТ
import { MONTHS_BG } from '@/Helpers/GenerateMonths'
import Spinner from "@/Helpers/Spinner";
import styles from "./monthTax.module.css";
import { getAllApartments } from "@/Functions/Apartmets";
import SignaturePad from "@/Canvas/Canvas";
import { useCalculateMonthTax } from "@/Hooks/CalculateMothTax";
import { useSuccessModal } from "@/Hooks/ModalHook";
import Calendar from "@/Component/Month check/Calendar";
import CurrentMonth from "@/Component/Month check/CurrentMonth";
import SelectYear from "@/Component/Month check/SelectYear";


const MontTax = () => {

    const { user, dataSettings, setDataSettings, isReady } = useAuthGuard();

    const [apartments, setApartments] = useState(null);
    const [selectedMonth, setSelectedMonth] = useState(null);
    const [signatureFor, setSignatureFor] = useState(null);

    const { monthTax } = useCalculateMonthTax()
    const { successMessage, contextHolder } = useSuccessModal()
    const currentYear = new Date().getFullYear();
    const [choisentYear, setChoisentYear] = useState(currentYear)

    const successPay = () => {
        getAllApartments().then(setApartments);
        successMessage(`Успешно плащане ап. ${signatureFor.apartment}!`)
    }

    useEffect(() => {
        if (!isReady || !user) return;

        const load = async () => {
            const data = await getAllApartments();
            setApartments(data);
        };
        load();
    }, [isReady, user]);

    const hasPayment = (apt, monthName) => {
        if (!Array.isArray(apt.year)) return false;

        return apt.year.some(url =>
            typeof url === "string" &&
            url.includes(`${choisentYear}_${monthName}_${apt.apartment}`)
        );
    };

    if (!isReady || !user || !dataSettings || !apartments) return <Spinner />;


    return (
        <div className={styles.container}>
            {contextHolder}

            {!signatureFor &&
                <SelectYear
                    setChoisentYear={setChoisentYear}
                    currentYear={currentYear}
                    choisentYear={choisentYear}
                />
            }

            {!signatureFor &&
                <h2 className={styles.title}>Таксуване – {choisentYear}</h2>
            }

            <Calendar
                selectedMonth={selectedMonth}
                MONTHS_BG={MONTHS_BG}
                setSelectedMonth={setSelectedMonth}
                hasPayment={hasPayment}
                apartments={apartments}
                user={user} // ⬅️ Вече гарантирано наличен
            />

            <CurrentMonth
                selectedMonth={selectedMonth}
                signatureFor={signatureFor}
                setSelectedMonth={setSelectedMonth}
                apartments={apartments}
                monthTax={monthTax}
                hasPayment={hasPayment}
                setSignatureFor={setSignatureFor}
            />

            {signatureFor && (
                <div className={styles.overlay}>
                    <div className={styles.sigContainer}>
                        <h3>
                            Плащане за {signatureFor.month} — Апартамент {signatureFor.apartment}
                        </h3>
                        <SignaturePad
                            apartNumber={signatureFor.apartment}
                            monthName={signatureFor.month}
                            year={choisentYear}
                            apartmentId={signatureFor.id}
                            onClose={() => setSignatureFor(null)}
                            onSuccess={successPay}
                            money={signatureFor.money}
                            dataSettings={dataSettings} // ⬅️ Вече гарантирано наличен
                            setDataSettings={setDataSettings} // ⬅️ Вече гарантирано наличен
                        />

                    </div>
                </div>
            )}

        </div>
    );
};

export default MontTax;