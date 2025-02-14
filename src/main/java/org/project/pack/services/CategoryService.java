package org.project.pack.services;

import java.util.List;

import org.project.pack.entity.MainCategory;
import org.project.pack.entity.SubCategory;
import org.project.pack.repository.MainCategoryRepository;
import org.project.pack.repository.SubCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private MainCategoryRepository mainCategoryRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    public List<SubCategory> getSubCategoriesByMainCategoryId(Long mainCategoryId) {
        return subCategoryRepository.findBymaincategory_mainCategoryId(mainCategoryId);
    }

    public List<MainCategory> getAllMainCategories() {
        return mainCategoryRepository.findAll();
    }
}
