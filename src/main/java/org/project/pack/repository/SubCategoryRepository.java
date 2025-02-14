package org.project.pack.repository;

import java.util.List;

import org.project.pack.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
	public List<SubCategory> findBymaincategory_mainCategoryId(Long mainCategoryId);
	public SubCategory findByName(String name);
	public SubCategory findBySubCategoryId(Long subCategoryId);
	public SubCategory findBySubCategoryIdAndMaincategory_MainCategoryId(Long subCategoryId, Long mainCategoryId);
}
