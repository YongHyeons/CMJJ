package org.project.pack.repository;

import java.util.List;

import org.project.pack.entity.OneDayClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface OneDayClassRepository extends JpaRepository<OneDayClass, Long>, JpaSpecificationExecutor<OneDayClass>,PagingAndSortingRepository<OneDayClass, Long> {

    @Query("SELECT o FROM OneDayClass o " +
           "JOIN FETCH o.maincategory " + 
           "JOIN FETCH o.subcategory " +  
           "JOIN FETCH o.user " +      
           "WHERE o.cId IN :cIds")
    public List<OneDayClass> findAllBycIds(List<Long> cIds);
    
    @Query("SELECT o FROM OneDayClass o " +
            "JOIN FETCH o.maincategory " +
            "JOIN FETCH o.subcategory " +
            "JOIN FETCH o.user ")
    public List<OneDayClass> findAllwithFetch();
    
    
    @Query("SELECT o FROM OneDayClass o " +
            "JOIN FETCH o.maincategory " +
            "JOIN FETCH o.subcategory " +
            "JOIN FETCH o.user " +
            "WHERE o.id = :cId")
    public OneDayClass findBycId(@Param("cId")Long cId);
    
    @Query("SELECT o FROM OneDayClass o " +
    		"JOIN FETCH o.maincategory " +
    		"JOIN FETCH o.subcategory " +
    		"JOIN FETCH o.user u " +
    		"WHERE u.uId = :uId"
    		)
    public List<OneDayClass> findAllByUser_uId(Long uId);
    public OneDayClass findByImageKey(String imageKey);
}
