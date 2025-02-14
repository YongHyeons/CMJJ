package org.project.pack.controller.app;

import org.project.pack.classes.UD;
import org.project.pack.entity.OneDayClass;
import org.project.pack.services.OneDayClassService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.lang.Nullable;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class SearchPageAppController {

    @Autowired
    private OneDayClassService oneDayClassService;

    
    @GetMapping("/search")
    public String searchPage(Model model, @AuthenticationPrincipal @Nullable UD ud, @RequestParam(defaultValue = "title") String sortBy) {
        Page<OneDayClass> odcPage = oneDayClassService.getClasses(0, 16, sortBy);
        model.addAttribute("classesPage", odcPage);
        model.addAttribute("uId", ud!=null ? ud.getUser().getUId() : null);
        model.addAttribute("sortBy", sortBy);
        return "search";
    }

    @GetMapping("/search/results")
    public String searchClasses(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String cAddr,
            @RequestParam(required = false) String price,
            @RequestParam(required = false) String avgRating,
            @RequestParam(required = false) String difficulty,
            @RequestParam(required = false) String userName,
            @RequestParam(required = false, defaultValue = "") String mainCategoryId,
            @RequestParam(required = false, defaultValue = "") String subCategoryId,
            @RequestParam(required = false) Integer duration,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "16") int size,
            @RequestParam(defaultValue = "title") String sortBy,
            Model model, @AuthenticationPrincipal @Nullable UD ud) {

        Double avgRatingValue = parseDoubleOrDefault(avgRating, 0.0);

        Page<OneDayClass> classesPage = oneDayClassService.getFilteredOneDayClasses(
                title, cAddr, price, avgRatingValue, difficulty, userName, 
                mainCategoryId, subCategoryId, duration, page - 1, size, sortBy);

        model.addAttribute("classesPage", classesPage);
        model.addAttribute("uId", ud!=null ? ud.getUser().getUId() : null);
        model.addAttribute("sortBy", sortBy);
        return "results";
    }

    private Double parseDoubleOrDefault(String value, Double defaultValue) {
        try {
            return value != null && !value.isEmpty() ? Double.parseDouble(value) : defaultValue;
        } catch (NumberFormatException e) {
            return defaultValue;
        }
    }

    @GetMapping("/search3")
    public String method3() {
        return "search3";
    }
}
