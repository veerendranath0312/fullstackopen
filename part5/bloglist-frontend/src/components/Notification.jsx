const Notification = (props) => {
  const { notification } = props
  return (
    <>
      {notification && (
        <p className={`notification-${notification.status}`}>
          {notification.message}
        </p>
      )}
    </>
  )
}

export default Notification
