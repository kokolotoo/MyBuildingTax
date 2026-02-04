import { useEffect, useState } from "react";
import {
    subscribeToTopics, toggleLike, deleteTopic
} from "@/Functions/DiscusisonsFunctions";
import CommentsSection from "./CommentsSection";
import Spinner from "@/Helpers/Spinner";
import styles from "@/Styles/discusions.module.css";
import { useSuccessModal } from "../../Hooks/ModalHook";
import { FaRegCommentDots } from "react-icons/fa";

const TopicsList = ({ user }) => {

    const { contextHolder, confirmModal, successMessage } = useSuccessModal()
    const [topics, setTopics] = useState([]);
    const [commentsVisible, setCommentsVisible] = useState(false)

    useEffect(() => {
        const unsub = subscribeToTopics(setTopics);
        return () => unsub();
    }, []);


    if (!user) return <Spinner />;

    const deleteCurrentTopic = async (id) => {
        const confirm = await confirmModal('Изтриване на темата?')
        if (confirm) {
            await deleteTopic(id)
            successMessage("Успешно изтрита тема")
        }
        return
    }

    const canDelete = (topic) =>
        user.cashier || user.housMenager || topic.authorId === `Ап. ${user.user}`;

    return (
        <div className={styles.container}>
            {contextHolder}

            {topics.length > 0 ? topics.map((topic) => (
                <div key={topic.id} className={styles.card}>
                    <div className={styles.header}>
                        <span className={styles.author}>{topic.authorId}</span>

                        {canDelete(topic) && (
                            <button
                                className={styles.deleteBtn}
                                onClick={() => deleteCurrentTopic(topic.id)}
                            >
                                ✖
                            </button>
                        )}
                    </div>

                    <h3 className={styles.topicTitle}>{topic.title}</h3>
                    <p className={styles.content}>{topic.content}</p>


                    <div className={styles.actions}>

                        <button
                            className={styles.commentButton}
                            onClick={() => setCommentsVisible(prev => !prev)}
                            title="Коментирай"
                        ><FaRegCommentDots /></button>

                        <button
                            className={styles.likeBtn}
                            onClick={() => toggleLike(topic.id, user.user)}
                            title="Харесай"
                        >
                            👍 {topic.likes?.length || 0}
                        </button>

                    </div>

                    <CommentsSection
                        user={user}
                        topicId={topic.id}
                        commentsVisible={commentsVisible}
                        setCommentsVisible={setCommentsVisible}
                    />

                </div>


            )) :
                <p className={styles.infoText}>Няма създадени теми !</p>
            }
        </div>
    );
};

export default TopicsList;
