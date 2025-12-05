import { useState, useEffect } from "react";
import { useAuthGuard } from '@/Hooks/useAuthGuard';
import styles from "./apartment.module.css";
import { getAllApartments, editApartment } from "../../Functions/Apartmets";
import Spinner from "@/Helpers/Spinner";
import { useSuccessModal } from "@/Hooks/ModalHook";
import { checkForRegister } from "@/Functions/FirebaseFunctions";
import Editing from "@/Component/Apartments/Editing";
import ApartmentData from "@/Component/Apartments/ApartmentData";


const Apartments = () => {
    const { user, isReady } = useAuthGuard();
    const [dataApartments, setDataApartments] = useState(null);
    const [editing, setEditing] = useState(null);
    const [ownerValue, setOwnerValue] = useState("");
    const [ownerPhone, setOwnerPhone] = useState("");
    const [peopleValue, setPeopleValue] = useState(0);
    const { confirmModal, successMessage, contextHolder } = useSuccessModal();

    const canEdit = user?.cashier || user?.housMenager;


    if (!isReady || !user) {
        return <Spinner />;
    }

    // 🚀 ЕФЕКТ: Зареждане на апартаменти и проверка на регистрацията
    useEffect(() => {
        if (isReady && user) {
            const load = async () => {
                const apartments = await getAllApartments();

                if (apartments && apartments.length > 0) {
                    // Изпълняваме асинхронна проверка за всеки апартамент
                    const apartmentsWithRegStatus = await Promise.all(
                        apartments.map(async (apt) => {
                            // ⭐️ Четем булеановата стойност
                            const isRegistered = await checkForRegister(Number(apt.apartment));
                            return {
                                ...apt,
                                isRegistered: isRegistered // Добавяме новия булеан проп
                            };
                        })
                    );
                    setDataApartments(apartmentsWithRegStatus);
                } else {
                    setDataApartments([]);
                }
            };
            load();
        }
    }, [isReady, user]);

    // Функции за редакция (непроменени)
    const startEdit = (apt) => {
        if (!canEdit) return;

        setEditing(apt.id);
        setOwnerValue(apt.owner);
        setPeopleValue(apt.people);
        setOwnerPhone(apt.phone ? apt.phone : ownerPhone)
    };

    const saveEdit = async () => {
        if (!canEdit) return;

        const ok = await confirmModal("Потвърдете промените");
        if (!ok) return cancelEdit();

        await editApartment(editing, {
            owner: ownerValue,
            people: Number(peopleValue),
            phone: ownerPhone
        });


        setDataApartments((prev) =>
            prev.map((a) =>
                a.id === editing
                    ? { ...a, owner: ownerValue, people: Number(peopleValue), phone: ownerPhone }
                    : a
            )
        );

        successMessage("Успешно променени данни!");
        cancelEdit();
    };

    const cancelEdit = () => {
        setEditing(null);
        setOwnerValue("");
        setPeopleValue(0);
        setOwnerPhone('')
    };

    // Guard Clause за зареждане на апартаментите
    if (!dataApartments) return <Spinner />;


    return (
        <section className={styles.page}>
            {contextHolder}

            <main className={styles.main_container}>
                <div className={styles.cards_wrapper}>
                    {dataApartments.map((apt) => {
                        // ⭐️ ВЕЧЕ ЧЕТЕМ БУЛЕАН СТОЙНОСТТА ДИРЕКТНО:
                        const isRegistered = apt.isRegistered;

                        return (
                            <div
                                key={apt.id}
                                className={`${styles.card} ${apt.people === 0 ? styles.free : ""}`}
                            >

                                <p className={styles.numberBox}>№ {apt.apartment}</p>

                                <ApartmentData
                                    editing={editing}
                                    apt={apt}
                                    ownerValue={ownerValue}
                                    setOwnerValue={setOwnerValue}
                                    peopleValue={peopleValue}
                                    setPeopleValue={setPeopleValue}
                                    ownerPhone={ownerPhone}
                                    setOwnerPhone={setOwnerPhone}
                                    isRegistered={isRegistered}
                                />

                                {/* Buttons */}
                                <Editing
                                    editing={editing}
                                    apt={apt}
                                    saveEdit={saveEdit}
                                    cancelEdit={cancelEdit}
                                    startEdit={startEdit}
                                    canEdit={canEdit}
                                />

                            </div>
                        )
                    })}
                </div>
            </main>
        </section>
    );
};

export default Apartments;