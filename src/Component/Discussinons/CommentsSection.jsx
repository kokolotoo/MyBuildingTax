import { useEffect, useState } from "react";
import { addComment, subscribeToComments } from ".././../Functions/DiscusisonsFunctions";
import styles from '../../Styles/discusions.module.css'

const CommentsSection = ({ topicId, user }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        const unsub = subscribeToComments(topicId, setComments);
        return () => unsub();
    }, [topicId]);

    const submit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        await addComment(topicId, text, user.user);
        setText("");
    };

    return (
        <div>
            <h4 className={styles.comments_title}>{comments.length?'Коментари:': '' }</h4>

            {comments.map(c => (
                <div key={c.id} className={styles.singleComment}>
                    <small>ап:{c.userId}: </small>
                    <i>{c.text}</i>
                    <hr />
                </div>
            ))}

            <form onSubmit={submit} className={styles.comments_form}>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Напиши коментар..."
                    required
                />
                <button>Изпрати</button>
            </form>
        </div>
    );
};

export default CommentsSection;