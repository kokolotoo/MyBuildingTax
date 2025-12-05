import styles from '@/Pages/Apartments/apartment.module.css'

const Editing = ({
    canEdit, editing, apt,
    saveEdit, cancelEdit, startEdit
}) => {

    
    return (
        <>
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
        </>
    )
}

export default Editing
