package org.project.pack.repository;

import java.util.List;

import org.project.pack.entity.MainCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MainCategoryRepository extends JpaRepository<MainCategory, Long> {
	public List<MainCategory> findAll();
	public MainCategory findByName(String name);
	public MainCategory findByMainCategoryId(Long mainCategoryId);
}
