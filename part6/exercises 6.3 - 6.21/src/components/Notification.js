import { connect } from 'react-redux';

const Notification = (props) => {
    const notification = props.notification.message !== '' ? props.notification : undefined;

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1
    };

    return (
        <div>
            { notification && 
                <div style={style}>
                    {notification.message}
                </div>
            }
        </div>
        
    );
};

const mapStateToProps = (state) => {
    return {
        notification: state.notification
    };
};

const ConnectedNotification = connect(mapStateToProps)(Notification);

export default ConnectedNotification;