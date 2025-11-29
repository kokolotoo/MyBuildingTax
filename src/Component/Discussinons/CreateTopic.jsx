import { useState } from "react";
import { addTopic } from ".././../Functions/DiscusisonsFunctions";
import { useContext } from "react";
import DataContext from "../../Context/DataContext";
import styles from '../../Styles/discusions.module.css'


const CreateTopic = ({ createTopicVisible, setCreateTopicVisible }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { user } = useContext(DataContext);

    const submit = async e => {
        e.preventDefault();
        await addTopic(title, content, user);
        setTitle("");
        setContent("");
        setCreateTopicVisible(false)
    };

    return (
        <form
            onSubmit={submit}
            className={createTopicVisible ? styles.createTopicForm : styles.visible}
        >
            <input
                value={title}
                required
                onChange={e => setTitle(e.target.value)}
                placeholder="Заглавие"
            />

            <textarea
                value={content}
                required
                onChange={e => setContent(e.target.value)}
                placeholder="Съдържание"
            />

            <button type="submit">Публикувай</button>
        </form>
    );
};

export default CreateTopic;