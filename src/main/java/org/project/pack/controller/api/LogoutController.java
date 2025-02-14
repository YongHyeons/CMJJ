package org.project.pack.controller.api;

import java.io.IOException;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Controller
public class LogoutController {
	
	@GetMapping("/perform/google-logout")
    public void googleLogout(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // 세션 무효화 및 인증 정보 제거
        request.getSession().invalidate();
        SecurityContextHolder.clearContext();

        // 구글 로그아웃 페이지로 리다이렉트
        response.sendRedirect("https://accounts.google.com/Logout?continue=https://www.google.com");
    }
	
}
