import { supabase } from './supabaseClient';
import { Message, MessageInput, MessageWithSender } from '../types';

/**
 * Get all messages for current user
 */
export async function getMyMessages(): Promise<MessageWithSender[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!sender_id(*),
      receiver:profiles!receiver_id(*)
    `)
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get received messages
 */
export async function getReceivedMessages(): Promise<MessageWithSender[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!sender_id(*)
    `)
    .eq('receiver_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get sent messages
 */
export async function getSentMessages(): Promise<MessageWithSender[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      receiver:profiles!receiver_id(*)
    `)
    .eq('sender_id', user.id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get unread messages
 */
export async function getUnreadMessages(): Promise<MessageWithSender[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!sender_id(*)
    `)
    .eq('receiver_id', user.id)
    .eq('read', false)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

/**
 * Get unread message count
 */
export async function getUnreadCount(): Promise<number> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return 0;

  const { count, error } = await supabase
    .from('messages')
    .select('*', { count: 'exact', head: true })
    .eq('receiver_id', user.id)
    .eq('read', false);

  if (error) throw error;
  return count || 0;
}

/**
 * Get conversation between two users
 */
export async function getConversation(otherUserId: string): Promise<MessageWithSender[]> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!sender_id(*),
      receiver:profiles!receiver_id(*)
    `)
    .or(
      `and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`
    )
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Send message
 */
export async function sendMessage(receiverId: string, content: string): Promise<Message> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('messages')
    .insert([
      {
        sender_id: user.id,
        receiver_id: receiverId,
        content,
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mark message as read
 */
export async function markAsRead(messageId: string): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('id', messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Mark all messages from a user as read
 */
export async function markAllAsReadFrom(senderId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('messages')
    .update({ read: true })
    .eq('receiver_id', user.id)
    .eq('sender_id', senderId)
    .eq('read', false);

  if (error) throw error;
}

/**
 * Delete message
 */
export async function deleteMessage(messageId: string): Promise<void> {
  const { error } = await supabase
    .from('messages')
    .delete()
    .eq('id', messageId);

  if (error) throw error;
}

/**
 * Get conversation list (unique users with last message)
 */
export async function getConversationList(): Promise<
  Array<{
    userId: string;
    userName: string;
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
  }>
> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  // Get all messages
  const messages = await getMyMessages();

  // Group by conversation partner
  const conversations = new Map<
    string,
    {
      userId: string;
      userName: string;
      lastMessage: string;
      lastMessageTime: string;
      unreadCount: number;
    }
  >();

  messages.forEach((msg) => {
    const isReceived = msg.receiver_id === user.id;
    const partnerId = isReceived ? msg.sender_id : msg.receiver_id;
    const partnerName = isReceived
      ? msg.sender?.full_name || msg.sender?.email || 'Unknown'
      : msg.receiver?.full_name || msg.receiver?.email || 'Unknown';

    const existing = conversations.get(partnerId);

    if (!existing || new Date(msg.created_at) > new Date(existing.lastMessageTime)) {
      conversations.set(partnerId, {
        userId: partnerId,
        userName: partnerName,
        lastMessage: msg.content,
        lastMessageTime: msg.created_at,
        unreadCount: isReceived && !msg.read ? 1 : (existing?.unreadCount || 0),
      });
    } else if (isReceived && !msg.read) {
      existing.unreadCount++;
    }
  });

  return Array.from(conversations.values()).sort(
    (a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
  );
}

/**
 * Subscribe to new messages (real-time)
 */
export function subscribeToMessages(
  callback: (message: Message) => void
): () => void {
  const { data: { user } } = supabase.auth.getUser();

  const subscription = supabase
    .channel('messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: user ? `receiver_id=eq.${user.id}` : undefined,
      },
      (payload) => {
        callback(payload.new as Message);
      }
    )
    .subscribe();

  return () => {
    subscription.unsubscribe();
  };
}
