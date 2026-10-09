import { useState } from 'react';
import styles from '@/Styles/menagers.module.css';
import { Input } from 'antd';
import { updateData } from '@/Functions/FirebaseFunctions';
import { useSuccessModal } from '@/Hooks/ModalHook';

const CurrentTax = ({ dataSettings }) => {
    const [changeTax, setChangeTax] = useState(false);
    const [newData, setNewData] = useState(dataSettings);
    const { successMessage, contextHolder, confirmModal } = useSuccessModal();

    const formatNumber = (value) => {
        if (value === "" || value == null) return "";
        const num = Number(value);
        if (isNaN(num)) return value;
        return num.toFixed(2);
    };

    const handleUpdateData = async () => {
        if (!changeTax) {
            setChangeTax(true);
            return;
        }

        const confirm = await confirmModal("Потвърдете промените");

        if (confirm) {
            const finalData = {
                ...newData,
                lowTax: Number(newData.lowTax),
                hightTax: Number(newData.hightTax),
            };

            await updateData(finalData);
            successMessage("Успешно променени данни!");
        } else {
            setNewData(dataSettings);
        }

        setChangeTax(false);
    };

    const handleCancel = () => {
        setNewData(dataSettings);
        setChangeTax(false);
    };

    return (
        <main className={styles.taxInfo}>
            {contextHolder}
            <div>
                <p>
                    Домашен любимец: € 
                   <b className={styles.price} >5.00</b>
                </p>
            </div>


            <div>
                <p>
                    Живущ на 1 и 2 етаж: €
                    {changeTax ? (
                        <Input
                            type="number"
                            value={newData.lowTax}
                            onChange={(e) =>
                                setNewData({ ...newData, lowTax: e.target.value })
                            }
                            style={{ width: 70, margin: 5 }}
                        />
                    ) : (
                        <span className={styles.price}>{formatNumber(newData.lowTax)}</span>
                    )}
                </p>
            </div>


            <div>
                <p>
                    Живущ 3 етаж и нагоре: €
                    {changeTax ? (
                        <Input
                            type="number"
                            value={newData.hightTax}
                            onChange={(e) =>
                                setNewData({ ...newData, hightTax: e.target.value })
                            }
                            style={{ width: 70, margin: 5 }}
                        />
                    ) : (
                        <span className={styles.price}>{formatNumber(newData.hightTax)}</span>
                    )}
                </p>



                <div className={styles.buttons}>
                    <button
                        onClick={handleUpdateData}
                        className={changeTax ? styles.save_change_menager_but : styles.change_menager_but}
                    >
                        {changeTax ? '💾 Запази' : '✏️ Промени Таксата'}
                    </button>

                    {changeTax && (
                        <button
                            className={styles.reject_but}
                            onClick={handleCancel}
                        >
                            ❌ Откажи
                        </button>
                    )}
                </div>
            </div>
        </main>
    );
};

export default CurrentTax;



