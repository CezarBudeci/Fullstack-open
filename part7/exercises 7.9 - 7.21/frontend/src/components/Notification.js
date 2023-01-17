import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector(state => state.notification);

    return (
        <div>
            {notification.message && notification.type && (
                <p
                    className={
                        notification.type === 'MESSAGE' ? 'message' : 'error'
                    }>
                    {notification.message}
                </p>
            )}
        </div>
    );
};

export default Notification;
