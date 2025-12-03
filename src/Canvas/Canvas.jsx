import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import style from './canvas.module.css';
import { uploadImg } from "../Config/SupaBase_Config";
import { base64ToFile } from "../Functions/BaseToFile64";
import { updateData } from "../Functions/FirebaseFunctions";
import { addApartmentPicUrl } from "../Functions/Apartmets";
import Spinner from '../Helpers/Spinner'


const SignaturePad = ({
    apartNumber, monthName, year,
    onClose, apartmentId, money,
    dataSettings, setDataSettings,
    onSuccess
}) => {

    const sigCanvas = useRef(null);
    const [isSigned, setIsSigned] = useState(false);
    // 🛑 ДОБАВЕН СТЕЙТ ЗА ЗАРЕЖДАНЕ
    const [isLoading, setIsLoading] = useState(false);


    // когато потребителят рисува
    const handleEnd = () => {
        setIsSigned(true);
    };

    // изчистване
    const clear = () => {
        sigCanvas.current.clear();
        setIsSigned(false);
    };

    // запазване
    const save = async () => {
        if (!isSigned) {
            alert("Моля, направете подпис преди да запазите.");
            return;
        }

        setIsLoading(true);

        try {
            const dataURL = sigCanvas.current.getCanvas().toDataURL("image/png");

            const fileName = `${year}_${monthName}_${apartNumber}.png`;

            const file = base64ToFile(dataURL, fileName);

            const uploadedUrl = await uploadImg(file, fileName);

            await addApartmentPicUrl(apartmentId, uploadedUrl);

            const newData = {
                ...dataSettings, money: Number(dataSettings.money) + Number(money)
            }

            if (typeof setDataSettings === 'function') {
                setDataSettings(newData);
            }

            await updateData(newData);

            if (onSuccess) onSuccess();

            onClose();

        } catch (error) {
            console.error("Грешка при запазване на подписа:", error);
            alert("Възникна грешка при запазване. Моля, опитайте отново.");

        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className={style.signature_container}>

          
            <div className={style.canvas_wrapper}>
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="red"
                    onEnd={handleEnd}
                    canvasProps={{
                        className: `${style.signature_canvas}`,
                    }}
                />
               
                {isLoading && (
                    <div className={style.spinner_overlay}>
                        <Spinner />
                    </div>
                )}
            </div>

            <div className={style.buttons}>
                <button onClick={clear} className={style.clearBtn} disabled={isLoading}>Изчисти</button>
                <button className={style.rejectBtn} onClick={onClose} disabled={isLoading}>Отказ</button>
                <button onClick={save} className={style.payBtn} disabled={isLoading || !isSigned}>Плати</button>
            </div>
        </div>
    );
};

export default SignaturePad;

