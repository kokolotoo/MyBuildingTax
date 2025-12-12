import { useState } from "react";
import { addTopic } from "@/Functions/DiscusisonsFunctions";
import styles from '@/Styles/discusions.module.css'
import Spinner from '@/Helpers/Spinner'


const CreateTopic = ({
    createTopicVisible, setCreateTopicVisible, user, dataSettings
}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const submit = async e => {
        e.preventDefault();
        await addTopic(title, content, user, dataSettings);
        setTitle("");
        setContent("");
        setCreateTopicVisible(false)
    };
    if (!user) return <Spinner />
    return (
        <form
            onSubmit={submit}
            className={createTopicVisible ? styles.createTopicForm : styles.visible}
        >
            <input
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
                placeholder="Заглавие..."
            />

            <textarea
                value={content}
                required
                onChange={e => setContent(e.target.value)}
                placeholder="Съдържание..."
                rows={4}
            />
            <main className={styles.buttons_container}>
                <button type="submit" className={styles.submitButton}>Публикувай</button>
                <button
                    type="button"
                    className={styles.rejectButton}
                    onClick={() => setCreateTopicVisible(false)}
                >
                    Откажи
                </button>
            </main>

        </form>
    );
};

export default CreateTopic;