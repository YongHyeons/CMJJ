package org.project.pack.services;

import org.project.pack.entity.OneDayClass;
import org.project.pack.repository.OneDayClassRepository;
import org.project.pack.specifications.OneDayClassSpecifications;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OneDayClassService {

    @Autowired
    private final OneDayClassRepository odcRep;

    public OneDayClassService(OneDayClassRepository oneDayClassRepository) {
        this.odcRep = oneDayClassRepository;
    }

    public Page<OneDayClass> getFilteredOneDayClasses(
            String title, String cAddr, String price, 
            Double avgRating, String difficulty, 
            String userName, String mainCategoryId, 
            String subCategoryId, Integer duration, 
            int page, int size, String sortBy) 
    {
        Specification<OneDayClass> spec = Specification.where(null);

        spec = spec.and(OneDayClassSpecifications.hasTitle(title));
        spec = spec.and(OneDayClassSpecifications.hasCAddr(cAddr));
        spec = spec.and(OneDayClassSpecifications.hasPrice(price));
        spec = spec.and(OneDayClassSpecifications.hasAvgRatingGreaterThan(avgRating));
        if (difficulty != null && !difficulty.equalsIgnoreCase("0")) {
            spec = spec.and(OneDayClassSpecifications.hasDifficulty(difficulty));
        }
        spec = spec.and(OneDayClassSpecifications.hasUserName(userName));
        spec = spec.and(OneDayClassSpecifications.hasMainCategoryId(mainCategoryId));
        spec = spec.and(OneDayClassSpecifications.hasSubCategoryId(subCategoryId));
        spec = spec.and(OneDayClassSpecifications.hasDuration(duration));

        List<OneDayClass> allClasses = odcRep.findAll(spec);

        List<OneDayClass> sortedClasses = sortClasses(allClasses, sortBy);

        int start = Math.min(page * size, sortedClasses.size());
        int end = Math.min((page + 1) * size, sortedClasses.size());
        List<OneDayClass> pageContent = sortedClasses.subList(start, end);

        Pageable pageable = PageRequest.of(page, size);
        return new PageImpl<>(pageContent, pageable, sortedClasses.size());
    }

    private List<OneDayClass> sortClasses(List<OneDayClass> classes, String sortBy) {
        switch (sortBy) {
            case "price-asc":
                return classes.stream().sorted((c1, c2) -> Double.compare(c1.getPrice(), c2.getPrice())).collect(Collectors.toList());
            case "price-desc":
                return classes.stream().sorted((c1, c2) -> Double.compare(c2.getPrice(), c1.getPrice())).collect(Collectors.toList());
            case "avgRating-desc":
                return classes.stream().sorted((c1, c2) -> Double.compare(c2.getAvgRating(), c1.getAvgRating())).collect(Collectors.toList());
            case "title":
            default:
                return classes.stream().sorted((c1, c2) -> c1.getTitle().compareTo(c2.getTitle())).collect(Collectors.toList());
        }
    }
    public List<OneDayClass> getOneDayClassesBycIds(List<Long> cIds) {
        return odcRep.findAllBycIds(cIds);
    }
    public Page<OneDayClass> getClasses(int page, int size, String sortBy) {

        List<OneDayClass> allClasses = odcRep.findAll(Sort.by(sortBy));


        int start = Math.min(page * size, allClasses.size());
        int end = Math.min((page + 1) * size, allClasses.size());
        List<OneDayClass> pageContent = allClasses.subList(start, end);

        Pageable pageable = PageRequest.of(page, size);
        return new PageImpl<>(pageContent, pageable, allClasses.size());
    }
}
