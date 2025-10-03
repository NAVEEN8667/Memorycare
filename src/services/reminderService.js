// Simple reminder scheduling using setTimeout; in real apps, consider service workers or OS notifications
import { api } from './api';

const scheduled = new Map(); // id -> timeoutId

export function scheduleReminder(reminder) {
  // reminder: { _id, text, time (HH:MM) }
  if (!reminder?._id || !reminder?.time) return;
  cancelReminder(reminder._id);

  const now = new Date();
  const [hh, mm] = String(reminder.time).split(':').map(Number);
  const target = new Date();
  target.setHours(hh, mm, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1); // schedule for next day

  const ms = target - now;
  const timeoutId = setTimeout(async () => {
    try {
      // hit backend to trigger any server-side hooks if needed
      await api.post('/api/reminders/notify', { id: reminder._id });
    } catch {}
    // Fallback browser alert
    try {
      // eslint-disable-next-line no-alert
      alert(`Reminder: ${reminder.text} (${reminder.time})`);
    } catch {}
    // reschedule for next day
    scheduleReminder(reminder);
  }, ms);

  scheduled.set(reminder._id, timeoutId);
}

export function cancelReminder(id) {
  const t = scheduled.get(id);
  if (t) {
    clearTimeout(t);
    scheduled.delete(id);
  }
}

export function syncReminders(reminders = []) {
  // Schedule active reminders only
  reminders.forEach((r) => {
    if (r.active) scheduleReminder(r);
    else cancelReminder(r._id);
  });
}
