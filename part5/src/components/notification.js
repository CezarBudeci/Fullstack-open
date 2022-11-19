const Notification = ({ type, text }) => {
    return (
        <p className={type === 'MESSAGE' ? 'message' : 'error'}>{text}</p>
    );
};

export default Notification;