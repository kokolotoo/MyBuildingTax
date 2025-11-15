import { useState, useEffect, useContext } from "react";
import DataContext from "../../Context/DataContext";
import styles from './apartment.module.css';
import Navbar from "../../Component/Navbar/NavBar";
import { getAllApartments, editApartment } from "../../Functions/Apartmets";
import Spinner from "../../Helpers/Spinner";
import { useSuccessModal } from "../../Hooks/ModalHook";

const Apartments = () => {
    const [dataApartments, setDataApartments] = useState(null);
    const [editing, setEditing] = useState(null);
    const { confirmModal, successMessage, contextHolder } = useSuccessModal()
    const [ownerValue, setOwnerValue] = useState("");
    const [peopleValue, setPeopleValue] = useState(0);

    const { user } = useContext(DataContext);

    const canEdit = user?.cashier || user?.housMenager;

    useEffect(() => {
        const getData = async () => {
            const data = await getAllApartments();
            data && setDataApartments(data);
        };
        getData();
    }, []);

    const startEdit = (apt) => {
        if (!canEdit) return;

        setEditing(apt.id);
        setOwnerValue(apt.owner);
        setPeopleValue(apt.people);
    };

    const saveEdit = async () => {
        if (!canEdit) return;
        const confirm = await confirmModal("Потвърдете промените");
        if(confirm){
            await editApartment(editing, {
                owner: ownerValue,
                people: Number(peopleValue)
            });

            setDataApartments(prev =>
                prev.map(a =>
                    a.id === editing
                        ? { ...a, owner: ownerValue, people: Number(peopleValue) }
                        : a
                )
            );
            successMessage("Успешно променени данни!"); 
        }
      
        setEditing(null);
        setOwnerValue("");
        setPeopleValue(0);

    };

    const cancelEdit = () => {
        setEditing(null);
        setOwnerValue("");
        setPeopleValue(0);
    };

    return (
        <section className={styles.container}>
            {contextHolder}
            <Navbar />
            <main className={styles.main_container}>
                <h2>Списък на апартаментите</h2>

                {dataApartments ? (
                    <table className={styles.table_apartments}>
                        <thead className={styles.tHead_table}>
                            <tr>
                                <th>№</th>
                                <th>Титуляр</th>
                                <th>Таксувани</th>
                                {canEdit && <th>Действия</th>}
                            </tr>
                        </thead>

                        <tbody>
                            {dataApartments.map(apartment => (
                                <tr key={apartment.id}
                                    className={apartment.people === 0 ? styles.free_apartment : ''}
                                >
                                    <td>{apartment.apartment}</td>

                                    {/* -------- OWNER -------- */}
                                    <td>
                                        {editing === apartment.id ? (
                                            <input
                                                value={ownerValue}
                                                onChange={(e) => setOwnerValue(e.target.value)}
                                            />
                                        ) : (
                                            apartment.owner
                                        )}
                                    </td>

                                    {/* -------- PEOPLE -------- */}
                                    <td>
                                        {editing === apartment.id ? (
                                            <input
                                                type="number"
                                                min="0"
                                                value={peopleValue}
                                                onChange={(e) => setPeopleValue(e.target.value)}
                                                style={{ width: "60px" }}
                                            />
                                        ) : (
                                            apartment.people === 0
                                                ? "Свободен"
                                                : apartment.people
                                        )}
                                    </td>

                                    {/* -------- ACTIONS -------- */}
                                    {canEdit && (
                                        <td>
                                            {editing === apartment.id ? (
                                                <>
                                                    <button onClick={saveEdit}>💾</button>
                                                    <button onClick={cancelEdit}>❌</button>
                                                </>
                                            ) : (
                                                <button onClick={() => startEdit(apartment)}>
                                                    ✏️ 
                                                </button>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <Spinner />
                )}
            </main>
        </section>
    );
};

export default Apartments;

