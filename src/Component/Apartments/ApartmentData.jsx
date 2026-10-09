import styles from '@/Pages/Apartments/apartment.module.css';
import Input from "antd/es/input/Input";
import Checkbox from "antd/es/checkbox/Checkbox"; // Импортираме Checkbox компонента

const ApartmentData = ({
    editing, apt, ownerValue, setOwnerValue,
    peopleValue, setPeopleValue, ownerPhone,
    setOwnerPhone, isRegistered, pets, setPets
}) => {
    return (
        <div className={styles.info}>
            <p>
                <strong>Титуляр:</strong>{" "}
                {editing === apt.id ? (
                    <Input
                        value={ownerValue}
                        onChange={(e) => setOwnerValue(e.target.value)}
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
                        onChange={(e) => setPeopleValue(e.target.value)}
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
                        onChange={(e) => setOwnerPhone(e.target.value)}
                    />
                ) : (
                    apt.phone ? apt.phone : "няма номер"
                )}
            </p>

            <b>Регистрация: {isRegistered ? <span className={styles.positive}>✔</span> : '❌'}</b>

            <p>
                <strong>Любимец:</strong>{" "}
                {editing === apt.id ? (
                    <Checkbox
                        checked={pets}
                        onChange={(e) => setPets(e.target.checked)}
                    />
                ) : (
                    apt.pets ? <span className={styles.positive}>✔</span> : "❌"
                )}
            </p>
        </div>
    );
};

export default ApartmentData;
