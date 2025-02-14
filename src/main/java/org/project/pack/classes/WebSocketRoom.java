package org.project.pack.classes;

import java.util.List;
import java.util.concurrent.CopyOnWriteArraySet;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class WebSocketRoom {
	public CopyOnWriteArraySet<WebSocketSession> sessions;
	public WebSocketRoom() {
		sessions = new CopyOnWriteArraySet<WebSocketSession>();
	}
	
	public void AddUser(WebSocketSession session) { sessions.add(session); }
	public void RemoveUser(WebSocketSession session) { sessions.remove(session); }
	public WebSocketSession FindUser(final String key, final Object value) {
		try {
			return sessions
				.stream()
				.filter(ws->ws.getAttributes().get(key).equals(value))
				.toList().get(0);
		} catch(Exception e) { return null; }
	}
	public List<WebSocketSession> FindUserAll(final String key, final Object value) {
		try {
			return sessions
				.stream()
				.filter(ws->ws.getAttributes().get(key).equals(value))
				.toList();
		} catch(Exception e) { return null; }
	}
	public void BroadCast(String message) {
		for(WebSocketSession session : sessions) {
			try {
				session.sendMessage(new TextMessage(message));
			} catch(Exception e) {}
		}
	}
}



















