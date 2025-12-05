import styles from '@/Pages/Apartments/apartment.module.css'
import Input from "antd/es/input/Input";

const ApartmentData = ({
    editing, apt, ownerValue, setOwnerValue,
    peopleValue, setPeopleValue, ownerPhone,
    setOwnerPhone, isRegistered
}) => {
    return (
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

            <b>Регистрация: {isRegistered ? <span className={styles.positive}>✔</span> : '❌'}</b>
        </div>
    )
}

export default ApartmentData
