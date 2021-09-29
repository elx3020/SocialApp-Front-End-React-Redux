import { useState } from "react";

import { Link } from "react-router-dom";
// style for animations
import "../../styles/Notifications-Style.css";
// redux stuff
import { connect } from "react-redux";
import { markNotificationRead } from "../../redux/actions/userAction";

const Notifications = (props) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const { notifications } = props;

  // show notifications in panel

  const displayNotifications = (notification) => {
    let sentence =
      notification.type === "like" ? " like your post." : " comment your post";

    return (
      <li key={notification.notificationId}>
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to={`/${notification.recipient}/post/${notification.postId}`}
        >
          {notification.sender} {sentence}
        </Link>
      </li>
    );
  };

  const existANotification = notifications.some(
    (notification) => notification.read === false
  );

  // handler ui events

  const toogleNotificationPanel = (event) => {
    setIsPanelOpen((prev) => !prev);
    const panel = document.querySelector(".panel");
    if (!isPanelOpen) {
      panel.classList.add("panel-open");
      panel.classList.remove("panel-close");
      if (
        notifications.filter((notification) => notification.read === false)
          .length > 0
      ) {
        props.markNotificationRead(
          notifications
            .filter((notification) => notification.read === false)
            .map((notification) => notification.notificationId)
        );
      }
    } else {
      panel.classList.add("panel-close");
      panel.classList.remove("panel-open");
    }
  };

  const alertIcon = existANotification ? (
    <div className="alert-active"></div>
  ) : (
    <div></div>
  );

  const notificationList = notifications.map(displayNotifications);

  return (
    <div>
      <div className="notification-link" onClick={toogleNotificationPanel}>
        Notifications
      </div>
      {alertIcon}
      <div id="notifications-panel" className="panel">
        <ul>{notificationList}</ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

const mapActionsToProps = {
  markNotificationRead,
};

export default connect(mapStateToProps, mapActionsToProps)(Notifications);
