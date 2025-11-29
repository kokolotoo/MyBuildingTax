import { useEffect, useState, useContext } from "react";
import {
    subscribeToTopics,
    toggleLike,
    deleteTopic
} from "../../Functions/DiscusisonsFunctions";
import CommentsSection from "./CommentsSection";
import Spinner from "../../Helpers/Spinner";
import DataContext from "../../Context/DataContext";
import styles from "../../Styles/discusions.module.css";

const TopicsList = () => {
    const { user } = useContext(DataContext);
    const [topics, setTopics] = useState([]);

    if (!user) return <Spinner />;

    useEffect(() => {
        const unsub = subscribeToTopics(setTopics);
        return () => unsub();
    }, []);

    const canDelete = (topic) =>
        user.cashier || user.housMenager || topic.authorId === user.user;

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Форум</h2>

            {topics.map((topic) => (
                <div key={topic.id} className={styles.card}>
                    <div className={styles.header}>
                        <span className={styles.author}>ап. {topic.authorId}</span>

                        {canDelete(topic) && (
                            <button
                                className={styles.deleteBtn}
                                onClick={() => deleteTopic(topic.id)}
                            >
                                ✖
                            </button>
                        )}
                    </div>

                    <h3 className={styles.topicTitle}>{topic.title}</h3>
                    <p className={styles.content}>{topic.content}</p>

                    <div className={styles.actions}>
                        <button
                            className={styles.likeBtn}
                            onClick={() => toggleLike(topic.id, user.user)}
                        >
                            👍 {topic.likes?.length || 0}
                        </button>
                    </div>

                    <CommentsSection user={user} topicId={topic.id} />
                </div>
            ))}
        </div>
    );
};

export default TopicsList;
