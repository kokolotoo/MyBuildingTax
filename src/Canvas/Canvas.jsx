import React, { useRef, useState, useContext } from "react";
import SignatureCanvas from "react-signature-canvas";
import style from './canvas.module.css'; // ще добавим малко стилове
import { uploadImg } from "../Config/SupaBase_Config";
import { deleteImg } from "../Config/SupaBase_Config";
//import { base64ToFile } from "../Config/helpers";
import { base64ToFile } from "../Functions/BaseToFile64";
import DataContext from "../Context/DataContext";
import { pictureName } from "../Functions/GetPictureName";
import DataContext from "../Context/DataContext";


const SignaturePad = () => {
    const sigCanvas = useRef(null);
    const [isSigned, setIsSigned] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [fileName, setFileName] = useState('')
    const { user } = useContext(DataContext)

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

        // Генерира име като подаваме аргумент с номера на апартамента
        const fileName = pictureName(user.apartment)

        setFileName(fileName)

        // Превърни Base64 → File
        const file = base64ToFile(dataURL, fileName);

        console.log("Файл:", file); // <--- вече имаш реален файл с име!

        //връща името на снимката
        const success = await uploadImg(file, fileName)

        setImageURL(success);
    };

    const remove = async () => {
        await deleteImg(fileName)
        setIsSigned(false)
        setImageURL(null)
        clear()
    }



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
                <button className={style.rejectBtn}>Отказ</button>
                <button onClick={save} className={style.payBtn}>Плати</button>

            </div>

            {imageURL && (
                <div className={style.preview}>
                    <p>Записан подпис:</p>
                    <a href={imageURL} target="Blank">Signature Link</a>
                    <button className={style.deleteBtn}
                        onClick={remove}>Delete img</button>
                </div>
            )}
        </div>
    );
};

export default SignaturePad;
