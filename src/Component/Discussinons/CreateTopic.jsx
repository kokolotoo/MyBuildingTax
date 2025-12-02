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
            />

            <button type="submit">Публикувай</button>
        </form>
    );
};

export default CreateTopic;