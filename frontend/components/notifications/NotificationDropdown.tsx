
"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Bell } from "lucide-react";

import useNotifications from "@/hooks/useNotifications";

export default function NotificationDropdown() {
  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target as Node
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleNotificationClick =
    async (id: number) => {
      await markAsRead(id);
    };

  return (
    <div
      ref={dropdownRef}
      className="relative"
    >
      {/* Notification Button */}

      <button
        type="button"
        onClick={() =>
          setOpen(
            (current) => !current
          )
        }
        aria-label="Notifications"
        aria-expanded={open}
        className="
          relative
          flex h-9 w-9
          items-center
          justify-center
          rounded-lg
          text-[#6E7B7D]
          transition

          hover:bg-[#F2F6F6]
          hover:text-[#064B52]

          dark:text-[#9AA7A8]
          dark:hover:bg-[#243437]
          dark:hover:text-[#8BC1C4]
        "
      >
        <Bell
          className="h-[17px] w-[17px]"
          strokeWidth={1.8}
        />

        {unreadCount > 0 && (
          <span
            className="
              absolute
              right-[4px]
              top-[3px]
              flex
              h-4
              min-w-4
              items-center
              justify-center
              rounded-full
              bg-[#064B52]
              px-1
              text-[8px]
              font-semibold
              text-white
              ring-2
              ring-white

              dark:bg-[#72C9C4]
              dark:text-[#102326]
              dark:ring-[#172326]
            "
          >
            {unreadCount > 9
              ? "9+"
              : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}

      {open && (
        <div
          className="
            absolute
            right-0
            top-[calc(100%+10px)]
            z-50
            w-[350px]
            overflow-hidden
            rounded-2xl
            border
            border-[#DDE3E3]
            bg-white
            shadow-[0_12px_35px_rgba(24,33,36,0.12)]

            dark:border-[#293638]
            dark:bg-[#172326]
            dark:shadow-[0_12px_35px_rgba(0,0,0,0.35)]
          "
        >
          {/* Header */}

          <div
            className="
              flex
              items-center
              justify-between
              border-b
              border-[#E8ECEC]
              px-4
              py-3

              dark:border-[#293638]
            "
          >
            <div>
              <h3
                className="
                  text-sm
                  font-semibold
                  text-[#182124]

                  dark:text-[#F1F5F5]
                "
              >
                Notifications
              </h3>

              <p
                className="
                  mt-0.5
                  text-[10px]
                  text-[#6E7B7D]

                  dark:text-[#AAB8BA]
                "
              >
                {unreadCount > 0
                  ? `${unreadCount} unread`
                  : "All caught up"}
              </p>
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={async () => {
                  await markAllAsRead();
                }}
                className="
                  text-[10px]
                  font-medium
                  text-[#064B52]
                  hover:underline

                  dark:text-[#72C9C4]
                "
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications */}

          <div className="max-h-[360px] overflow-y-auto">
            {loading ? (
              <div
                className="
                  px-4
                  py-10
                  text-center
                  text-xs
                  text-[#6E7B7D]

                  dark:text-[#AAB8BA]
                "
              >
                Loading notifications...
              </div>
            ) : notifications.length ===
              0 ? (
              <div className="px-4 py-10 text-center">
                <Bell
                  className="
                    mx-auto
                    h-7
                    w-7
                    text-[#9AA7A8]

                    dark:text-[#53696C]
                  "
                  strokeWidth={1.5}
                />

                <p
                  className="
                    mt-2
                    text-xs
                    font-medium
                    text-[#536063]

                    dark:text-[#AAB8BA]
                  "
                >
                  No notifications
                </p>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-[#8A9697]

                    dark:text-[#718082]
                  "
                >
                  You&apos;re all caught up.
                </p>
              </div>
            ) : (
              notifications.map(
                (notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() =>
                      handleNotificationClick(
                        notification.id
                      )
                    }
                    className={`
                      flex
                      w-full
                      items-start
                      gap-3
                      border-b
                      border-[#E8ECEC]
                      px-4
                      py-3
                      text-left
                      transition

                      dark:border-[#293638]

                      ${
                        notification.isRead
                          ? "bg-white dark:bg-[#172326]"
                          : "bg-[#F3F6F6] dark:bg-[#20383B]"
                      }

                      hover:bg-[#F2F6F6]
                      dark:hover:bg-[#234448]
                    `}
                  >
                    {/* Status Dot */}

                    <span
                      className={`
                        mt-1.5
                        h-2
                        w-2
                        shrink-0
                        rounded-full

                        ${
                          notification.isRead
                            ? "bg-[#9AA7A8]"
                            : "bg-[#16777D]"
                        }
                      `}
                    />

                    {/* Content */}

                    <div className="min-w-0 flex-1">
                      <p
                        className={`
                          text-xs
                          font-semibold

                          ${
                            notification.isRead
                              ? "text-[#536063] dark:text-[#AAB8BA]"
                              : "text-[#182124] dark:text-[#F1F5F5]"
                          }
                        `}
                      >
                        {notification.title}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[11px]
                          leading-5
                          text-[#6E7B7D]

                          dark:text-[#AAB8BA]
                        "
                      >
                        {notification.message}
                      </p>

                      <p
                        className="
                          mt-1
                          text-[9px]
                          text-[#8A9697]

                          dark:text-[#718082]
                        "
                      >
                        {new Date(
                          notification.createdAt
                        ).toLocaleString()}
                      </p>
                    </div>
                  </button>
                )
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
