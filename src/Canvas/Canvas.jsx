import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import style from './canvas.module.css';
import { uploadImg } from "../Config/SupaBase_Config";
import { deleteImg } from "../Config/SupaBase_Config";
import { base64ToFile } from "../Functions/BaseToFile64";

import { addApartmentPicUrl } from "../Functions/Apartmets";


const SignaturePad = ({
    apartNumber,
    monthName,
    year,
    onClose,
    apartmentId,
    onSuccess      // ← НОВО: функция за "refresh" след плащане
}) => {

    const sigCanvas = useRef(null);
    const [isSigned, setIsSigned] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [fileName, setFileName] = useState('');

    // когато потребителят рисува
    const handleEnd = () => {
        setIsSigned(true);
    };

    // изчистване
    const clear = () => {
        sigCanvas.current.clear();
        setIsSigned(false);
        setImageURL(null);
    };

    // запазване
    const save = async () => {
        if (!isSigned) {
            alert("Моля, направете подпис преди да запазите.");
            return;
        }

        const dataURL = sigCanvas.current.getCanvas().toDataURL("image/png");

        const fileName = `${year}_${monthName}_${apartNumber}.png`;
        setFileName(fileName);

        const file = base64ToFile(dataURL, fileName);

        const uploadedUrl = await uploadImg(file, fileName);

        setImageURL(uploadedUrl);

        // Добавяне в масива year на апартамента
        await addApartmentPicUrl(apartmentId, uploadedUrl);

        // 🔥 НОВО: извикване на MontTax за да се презареди UI
        if (onSuccess) onSuccess();
       
        // скриване на канваса
        onClose();
    };

    const remove = async () => {
        await deleteImg(fileName);
        setIsSigned(false);
        setImageURL(null);
        clear();
    };

    return (
        <div className={style.signature_container}>
           
            <SignatureCanvas
                ref={sigCanvas}
                penColor="red"
                onEnd={handleEnd}
                canvasProps={{
                    className: `${style.signature_canvas}`,
                }}
            />

            <div className={style.buttons}>
                <button onClick={clear} className={style.clearBtn}>Изчисти</button>
                <button className={style.rejectBtn} onClick={onClose}>Отказ</button>
                <button onClick={save} className={style.payBtn}>Плати</button>
            </div>

            {imageURL && (
                <div className={style.preview}>
                    <p>Записан подпис:</p>
                    <a href={imageURL} target="Blank">Signature Link</a>
                    <button className={style.deleteBtn} onClick={remove}>Delete img</button>
                </div>
            )}
        </div>
    );
};

export default SignaturePad;

