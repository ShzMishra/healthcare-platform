import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

function NotificationsPage() {

  const API =
  "https://healthcare-backend-bxwj.onrender.com/api";

  const token =
  localStorage.getItem(
    "token"
  );

  const [
    notifications,
    setNotifications
  ] =
  useState([]);

  useEffect(() => {

    loadNotifications();

  }, []);

  async function
  loadNotifications() {

    const res =
    await axios.get(

      `${API}/notifications`,

      {
        headers: {
          Authorization:
          `Bearer ${token}`
        }
      }
    );

    setNotifications(
      res.data
    );
  }

  async function
  markRead(id) {

    await axios.put(

      `${API}/notifications/${id}/read`,

      {},

      {
        headers: {
          Authorization:
          `Bearer ${token}`
        }
      }
    );

    loadNotifications();
  }

  return (

    <div
      className="
      notifications-page"
    >

      <h1>
        Notifications
      </h1>

      {
        notifications.map(n => (

          <div
            key={n.id}
            className={
              `notification-card
              ${
                n.read
                ? "read"
                : "unread"
              }`
            }
          >

            <h3>
              {n.title}
            </h3>

            <p>
              {n.message}
            </p>

            {
              !n.read &&

              <button
                onClick={() =>
                  markRead(
                    n.id
                  )
                }
              >
                Mark Read
              </button>
            }

          </div>
        ))
      }

    </div>
  );
}

export default
NotificationsPage;