import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => {
    if (state.notification.length !== 0) {
      return state.notification;
    } else {
      return null;
    }
  });
  const type = useSelector((state) => {
    return state.notificationType;
  });

  if (message === null) {
    return null;
  }
  if (type[0] === "error") {
    return <div className="error">{message}</div>;
  } else {
    return <div className="success">{message}</div>;
  }
};

export default Notification;
