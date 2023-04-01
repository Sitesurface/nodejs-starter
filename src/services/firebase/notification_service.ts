import admin from 'firebase-admin';
import { BatchResponse, Message, MulticastMessage } from 'firebase-admin/lib/messaging/messaging-api';
import { Service } from 'typedi';

/**
 * A service class for sending push notifications using Firebase Cloud Messaging (FCM).
 */
@Service()
class NotificationService {
  /**
   * Sends a single push notification message to a specified device.
   * @param message - The message to send.
   * @throws An error if the message could not be sent.
   */
  public async sendNotification(message: Message): Promise<string | Error> {
    return await admin.messaging().send(message);
  }

  /**
   * Sends a push notification message to multiple devices at once using FCM's multicast feature.
   * @param message - The message to send.
   * @throws An error if the message could not be sent.
   */
  public async sendAllNotification(message: MulticastMessage): Promise<BatchResponse | Error> {
    return await admin.messaging().sendMulticast(message);
  }
}

export default NotificationService;
