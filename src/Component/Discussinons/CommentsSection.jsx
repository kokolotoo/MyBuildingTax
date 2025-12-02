import { useEffect, useState } from "react";
import { addComment, subscribeToComments } from "@/Functions/DiscusisonsFunctions";
import styles from '@/Styles/discusions.module.css'
import { Collapse } from 'antd'; // Само Collapse
import { useAuthGuard } from "@/Hooks/useAuthGuard";
import { commentCreator } from "@/Helpers/SetCreatorName";

const CommentsSection = ({ topicId, user }) => {
    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const { dataSettings } = useAuthGuard()
    useEffect(() => {
        const unsub = subscribeToComments(topicId, setComments);
        return () => unsub();
    }, [topicId]);


    const submit = async (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        await addComment(topicId, text, commentCreator(dataSettings, user));
        setText("");
    };



    const commentListContent = (
        <div className={styles.commentsListContainer}>
            {comments.map(c => (
                <div key={c.id} className={styles.singleComment}>
                    <div className={styles.commentHeader}>
                        <span className={styles.commentAvatar}>{c.userId}</span>
                    </div>
                    <p className={styles.commentText}>{c.text}</p>
                </div>
            ))}
        </div>
    );

    // 2. Дефинирайте items масива за Collapse
    const items = [
        {
            key: '1',
            label: <span className={styles.panelHeaderTitle}>Виж всички {comments.length} коментара</span>,
            children: commentListContent, // Съдържанието, което се разгръща
            className: styles.commentPanel // Класът, който прилагахме на Panel
        },
    ];

    return (
        <div>
            {comments.length > 0 &&
                <div className={styles.commentWrapper}>
                    <Collapse
                        bordered={false}
                        expandIconPosition='end' 
                        items={items} 
                    />
                </div>
            }

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