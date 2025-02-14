package org.project.pack.configuration;

import org.project.pack.services.WebSocketService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocket
public class WebSocketConfiguration implements WebSocketConfigurer {
	
	@Value("${websocket.handler.path}")
	String socketPath;
	@Value("${websocket.handler.allowed.pattern}")
	String socketAllowedPattern;
	
	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry
			.addHandler(new WebSocketService(), socketPath)
			.addInterceptors(new HttpSessionHandshakeInterceptor())
			.setAllowedOriginPatterns(socketAllowedPattern);
	}
}
