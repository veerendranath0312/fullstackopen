import PropTypes from 'prop-types'

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

Notification.propTypes = {
  notification: PropTypes.oneOfType([PropTypes.object]),
}

export default Notification
