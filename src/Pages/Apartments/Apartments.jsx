import { useState, useEffect, useContext } from "react";
import DataContext from "../../Context/DataContext";
import styles from "./apartment.module.css";
import Navbar from "@/Component/Navbar/NavBar";
import { getAllApartments, editApartment } from "../../Functions/Apartmets";
import Spinner from "@/Helpers/Spinner";
import { useSuccessModal } from "@/Hooks/ModalHook";
import Input from "antd/es/input/Input";


const Apartments = () => {
    const [dataApartments, setDataApartments] = useState(null);
    const [editing, setEditing] = useState(null);
    const [ownerValue, setOwnerValue] = useState("");
    const [ownerPhone, setOwnerPhone] = useState("");
    const [peopleValue, setPeopleValue] = useState(0);

    const { confirmModal, successMessage, contextHolder } = useSuccessModal();
    const { user } = useContext(DataContext);

    const canEdit = user?.cashier || user?.housMenager;

    useEffect(() => {
        const load = async () => {
            const data = await getAllApartments();
            data && setDataApartments(data);
        };
        load();
    }, []);

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
                    ? { ...a, owner: ownerValue, people: Number(peopleValue) }
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

    return (
        <section className={styles.page}>
            {contextHolder}
            <Navbar />

            <main className={styles.main_container}>

                {!dataApartments ? (
                    <Spinner />
                ) : (
                    <div className={styles.cards_wrapper}>
                        {dataApartments.map((apt) => (
                            <div
                                key={apt.id}
                                className={`${styles.card} ${apt.people === 0 ? styles.free : ""
                                    }`}
                            >
                                {/* Apartment Number */}
                                <div className={styles.numberBox}>№ {apt.apartment}</div>

                                {/* Info */}
                                <div className={styles.info}>
                                    <p>
                                        <strong>Титуляр:</strong>{" "}
                                        {editing === apt.id ? (
                                            <Input
                                                value={ownerValue}
                                                onChange={(e) =>
                                                    setOwnerValue(e.target.value)
                                                }
                                            />
                                        ) : (
                                            apt.owner
                                        )}
                                    </p>

                                    <p>
                                        <strong>Таксувани:</strong>{" "}
                                        {editing === apt.id ? (
                                            <Input
                                                type="number"
                                                min="0"
                                                value={peopleValue}
                                                onChange={(e) =>
                                                    setPeopleValue(e.target.value)
                                                }
                                                style={{ width: "70px" }}
                                            />
                                        ) : apt.people === 0 ? (
                                            "Свободен"
                                        ) : (
                                            apt.people
                                        )}
                                    </p>

                                    <p>
                                        <strong>Телефон:</strong>{" "}
                                        {editing === apt.id ? (
                                            <Input
                                                value={ownerPhone}
                                                onChange={(e) =>
                                                    setOwnerPhone(e.target.value)
                                                }
                                            />
                                        ) : (
                                            apt.phone ? apt.phone : "няма номер"
                                        )}
                                    </p>
                                </div>

                                {/* Buttons */}
                                {canEdit && (
                                    <div className={styles.actions}>
                                        {editing === apt.id ? (
                                            <>
                                                <button
                                                    className={styles.saveBtn}
                                                    onClick={saveEdit}
                                                >
                                                    💾 Запази
                                                </button>
                                                <button
                                                    className={styles.cancelBtn}
                                                    onClick={cancelEdit}
                                                >
                                                    ❌Откажи
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className={styles.editBtn}
                                                onClick={() => startEdit(apt)}
                                            >
                                                ✏️ Редактирай
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>

        </section>
    );
};

export default Apartments;


