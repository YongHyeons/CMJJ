package org.project.pack.controller.api;

import java.util.List;

import org.project.pack.entity.MainCategory;
import org.project.pack.entity.SubCategory;
import org.project.pack.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class CategoryApiController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/subcategories")
    public ResponseEntity<List<SubCategory>> getSubCategories(@RequestParam("mainCategoryId") Long mainCategoryId) {
        List<SubCategory> subCategories = categoryService.getSubCategoriesByMainCategoryId(mainCategoryId);
        return ResponseEntity.ok(subCategories);
    }

    // 예를 들어 메인 카테고리 목록을 가져오는 엔드포인트 추가
    @GetMapping("/maincategories")
    public ResponseEntity<List<MainCategory>> getMainCategories() {
        List<MainCategory> mainCategories = categoryService.getAllMainCategories();
        return ResponseEntity.ok(mainCategories);
    }
}
