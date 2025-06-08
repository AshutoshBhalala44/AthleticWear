
import { Session } from '../models/Session.js';

// Session management for guest users
export const generateSessionId = () => {
  const session = Session.generateGuestSession();
  return session.sessionId;
};

export const getGuestSessionId = () => {
  let sessionId = localStorage.getItem('guest_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem('guest_session_id', sessionId);
  }
  return sessionId;
};

export const clearGuestSession = () => {
  const session = new Session(null);
  session.clear();
};
