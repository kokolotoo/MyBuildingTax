import { useEffect, useState } from "react";
import { addComment, subscribeToComments } from "@/Functions/DiscusisonsFunctions";
import styles from '@/Styles/discusions.module.css'
import { Collapse } from 'antd'; // Само Collapse


const CommentsSection = ({ topicId, user }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const { Panel } = Collapse;
    
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



    const commentList = (
        <div className={styles.commentsListContainer}>
            {comments.map(c => (
                <div key={c.id} className={styles.singleComment}>
                    <div className={styles.commentHeader}>
                        <span className={styles.commentAvatar}>Ап. {c.userId}</span>
                        {/* Можете да добавите дата тук, ако има */}
                    </div>
                    <p className={styles.commentText}>{c.text}</p>
                </div>
            ))}
        </div>
    );

    return (
        <div>

            <div className={styles.commentWrapper}>
                <Collapse
                    bordered={false}
                    expandIconPosition='right' // Иконата за разгъване да е отдясно
                >
                    <Panel
                        header={<span className={styles.panelHeaderTitle}>Виж всички {comments.length} коментара</span>}
                        key="1"
                        className={styles.commentPanel} // Клас за стилизиране
                    >
                        {commentList}
                    </Panel>
                </Collapse>
            </div>

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