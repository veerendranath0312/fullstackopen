function Notification(props) {
  if (props.notification === null) {
    return null;
  }

  const { message, status } = props.notification;

  return <p className={`notification notification-${status}`}>{message}</p>;
}

export default Notification;
