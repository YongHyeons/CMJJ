package org.project.pack.services;

import java.io.IOException;
import java.util.Map;

import org.project.pack.classes.UD;
import org.project.pack.classes.WebSocketRoom;
import org.project.pack.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

public class WebSocketService extends TextWebSocketHandler {
	public WebSocketRoom totalRoom;
	public WebSocketRoom publicRoom;
	public Map<String, WebSocketRoom> rooms;
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		totalRoom.AddUser(session);
		publicRoom.AddUser(session);
		session.getAttributes().put("room", publicRoom);
		session.getAttributes().put("session", session.getAttributes().get(HttpSessionHandshakeInterceptor.HTTP_SESSION_ID_ATTR_NAME));
		session.getAttributes().put("user", ((UD)SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUser());
		ConnectServer(session, (User)session.getAttributes().get("user"), (HttpSession)session.getAttributes().get("session"));
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		totalRoom.RemoveUser(session);
		((WebSocketRoom)session.getAttributes().get("room")).RemoveUser(session);
		DisConnectServer(session, (User)session.getAttributes().get("user"), (HttpSession)session.getAttributes().get("session"), (WebSocketRoom)session.getAttributes().get("room"));
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
	}
	
	@Override
	public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {}
	
	public void BroadCastAll(String message) { totalRoom.BroadCast(message); }
	public void BroadCastRoom(WebSocketRoom room, String message) { room.BroadCast(message); }
	public void BroadCastUser(WebSocketSession session, String message) {
		try { session.sendMessage(new TextMessage(message)); } catch (IOException e) {}
	}
	
	public void ConnectServer(WebSocketSession socket, User user, HttpSession session) {
		// 룸서버 연결된 후
	}
	public void DisConnectServer(WebSocketSession socket, User user, HttpSession session, WebSocketRoom room) {
		// 접속 종료 후
	}
	
}	








	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

