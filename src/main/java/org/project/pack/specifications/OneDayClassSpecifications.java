package org.project.pack.specifications;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.project.pack.entity.MainCategory;
import org.project.pack.entity.OneDayClass;
import org.project.pack.entity.SubCategory;
import org.project.pack.entity.User;
import org.springframework.data.jpa.domain.Specification;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;

public class OneDayClassSpecifications {

    public static Specification<OneDayClass> hasTitle(String title) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) ->
        title == null || title.isEmpty() ? cb.conjunction() : cb.like(root.get("title"), "%" + title + "%");
    }

    public static Specification<OneDayClass> hasCAddr(String cAddr) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) ->
            cAddr == null || cAddr.isEmpty() ? cb.conjunction() : cb.like(root.get("cAddr"), "%"+cAddr+"%");
    }

    public static Specification<OneDayClass> hasPriceBetween(Integer minPrice, Integer maxPrice) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (minPrice == null && maxPrice == null) { return cb.conjunction(); }
            if (minPrice != null && maxPrice != null) { return cb.between(root.get("price"), minPrice, maxPrice); }
            if (minPrice != null) { return cb.greaterThanOrEqualTo(root.get("price"), minPrice); }
            return cb.lessThanOrEqualTo(root.get("price"), maxPrice);
        };
    }
    
    public static Specification<OneDayClass> hasPrice(String price){
    	return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) ->{
    		if(price == null)return cb.conjunction();
    		if(price.isEmpty() || price.equals(""))return cb.conjunction();
    		if(price.equals("1")) return cb.lessThan(root.get("price"),50000);
    		if(price.equals("2")) return cb.between(root.get("price"),50000,100000);
    		if(price.equals("3")) return cb.between(root.get("price"),100000,200000);
    		if(price.equals("4")) return cb.between(root.get("price"),200000,300000);
    		if(price.equals("5")) return cb.between(root.get("price"),300000,400000);
    		if(price.equals("6")) return cb.between(root.get("price"),400000,500000);
    		else return cb.greaterThanOrEqualTo(root.get("price"),500000);
    	};
    }

    public static Specification<OneDayClass> hasAvgRatingGreaterThan(Double minAvgRating) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) ->
            minAvgRating == null? cb.conjunction() : cb.greaterThanOrEqualTo(root.get("avgRating"), minAvgRating);
    }

    public static Specification<OneDayClass> hasDifficulty(String difficulty) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            
            if (difficulty == null || difficulty.isEmpty()) {
                return cb.conjunction();
            }

            
            List<String> difficulties = Arrays.stream(difficulty.split(","))
                    .map(String::trim)
                    .collect(Collectors.toList());

            
            if (difficulties.isEmpty()) {
                return cb.conjunction();
            }

            
            if (difficulties.size() == 1) {
                return cb.equal(root.get("difficulty"), difficulties.get(0));
            }

            
            return root.get("difficulty").in(difficulties);
        };
    }


    public static Specification<OneDayClass> hasUserName(String userName) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (userName == null || userName.isEmpty()) { return cb.conjunction(); }
            Join<OneDayClass, User> userJoin = root.join("user");
            return cb.like(userJoin.get("name"), "%" + userName + "%");
        };
    }

    public static Specification<OneDayClass> hasMainCategoryId(String mainCategoryId) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (mainCategoryId == null || mainCategoryId.isEmpty()) { return cb.conjunction(); }
            Join<OneDayClass, MainCategory> mainCategoryJoin = root.join("maincategory");
            return cb.equal(mainCategoryJoin.get("mainCategoryId"), mainCategoryId);
        };
    }

    public static Specification<OneDayClass> hasSubCategoryId(String subCategoryId) {
        return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb) -> {
            if (subCategoryId == null || subCategoryId.isEmpty()) { return cb.conjunction(); }
            Join<OneDayClass, SubCategory> subCategoryJoin = root.join("subcategory");

            
            if (subCategoryId.contains(",")) {
                String[] subCategoryIds = subCategoryId.split(",");
                CriteriaBuilder.In<String> inClause = cb.in(subCategoryJoin.get("subCategoryId"));

                for (String id : subCategoryIds) {
                    inClause.value(id.trim());
                }

                return inClause;
            }

            
            return cb.equal(subCategoryJoin.get("subCategoryId"), subCategoryId);
        };
    }
    
    public static Specification<OneDayClass> hasDuration(Integer duration){
    	return (Root<OneDayClass> root, CriteriaQuery<?> query, CriteriaBuilder cb)->{
    		if(duration == null || duration.toString().isEmpty())return cb.conjunction();
    		return cb.equal(root.get("duration"),duration);
    	};
    }
    
}

