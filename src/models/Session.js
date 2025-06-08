
export class Session {
  constructor(sessionId, isGuest = true, userId = null) {
    this.sessionId = sessionId;
    this.isGuest = isGuest;
    this.userId = userId;
    this.createdAt = new Date().toISOString();
  }

  static generateGuestSession() {
    const sessionId = 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    return new Session(sessionId, true);
  }

  static fromJSON(data) {
    return new Session(data.sessionId, data.isGuest, data.userId);
  }

  toJSON() {
    return {
      sessionId: this.sessionId,
      isGuest: this.isGuest,
      userId: this.userId,
      createdAt: this.createdAt
    };
  }

  clear() {
    localStorage.removeItem('guest_session_id');
  }
}
