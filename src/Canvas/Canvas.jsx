import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import style from './canvas.module.css'; // ще добавим малко стилове
import { uploadImg } from "../Config/SupaBase_Config";
import { deleteImg } from "../Config/SupaBase_Config";

const SignaturePad = () => {
    const sigCanvas = useRef(null);
    const [isSigned, setIsSigned] = useState(false);
    const [imageURL, setImageURL] = useState(null);
    const [fileName, setFileName] = useState('')

    const base64ToFile = (base64Data, fileName) => {
        const arr = base64Data.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], fileName, { type: mime });
    };



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

        // Генерирай име
        const apartment = 10;
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const fileName = `signature_ap${apartment}_${year}_${month}.png`;
        setFileName(fileName)

        // Превърни Base64 → File
        const file = base64ToFile(dataURL, fileName);

        console.log("Файл:", file); // <--- вече имаш реален файл с име!

        const success =  await uploadImg(file, fileName)

        setImageURL(success);
    };

    const remove = async () =>{
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
                <button  className={style.rejectBtn}>Отказ</button>
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
