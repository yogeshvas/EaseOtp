package com.easeotp;

import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;

public class NotificationListener extends NotificationListenerService {
    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        String notificationContent = sbn.getNotification().extras.getString("android.text").toString();
        if (notificationContent.matches(".*\\d{4,6}.*")) {  // Simple regex to find OTP
            // Handle OTP extraction and storage
        }
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
    }
}
