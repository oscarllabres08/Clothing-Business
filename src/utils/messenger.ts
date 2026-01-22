import { ClothingItem } from '../lib/supabase';
import { SELLER_MESSENGER_USERNAME } from '../config/contact';

/**
 * Generates a Facebook Messenger URL with pre-filled clothing item information
 * @param item - The clothing item object to include in the message
 * @returns Facebook Messenger URL with encoded message
 */
export function generateMessengerUrl(item: ClothingItem): string {
  // Create a formatted message with clothing item details
  const message = `Hi! I'm interested in this item:

👕 ${item.brand} ${item.name}
💰 Price: ₱${item.price.toLocaleString()}
📏 Size: ${item.size}
🎨 Color: ${item.color}
🧵 Material: ${item.material}
📦 Category: ${item.category}

Could you please provide more information about this item?`;

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);

  // Facebook Messenger URL format: https://m.me/{username}?text={message}
  return `https://m.me/${SELLER_MESSENGER_USERNAME}?text=${encodedMessage}`;
}

