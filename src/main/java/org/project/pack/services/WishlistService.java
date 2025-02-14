package org.project.pack.services;

import org.project.pack.entity.OneDayClass;
import org.project.pack.entity.User;
import org.project.pack.entity.WishList;
import org.project.pack.repository.OneDayClassRepository;
import org.project.pack.repository.UserRepository;
import org.project.pack.repository.WishListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class WishlistService {

	@Autowired
    private WishListRepository wlRep;
	
	@Autowired
	UserRepository userRep;
	
	@Autowired 
	OneDayClassRepository odcRep;

    @Transactional
    public boolean addWishlistItem(Long uId, Long cId) {

        WishList existingWishList = wlRep.findByuser_uIdAndonedayclass_cId(uId, cId);

        if (existingWishList != null) {
            return false; 
        }


        WishList newWishList = new WishList();
        User user = userRep.findByuId(uId);
        OneDayClass odc = odcRep.findBycId(cId);
        newWishList.setUser(user); 
        newWishList.setOnedayclass(odc);
        newWishList.setWLId(null);
        wlRep.save(newWishList);
        return true;
    }

    @Transactional
    public boolean removeWishlistItem(Long uId, Long cId) {

        WishList wishListEntry = wlRep.findByuser_uIdAndonedayclass_cId(uId, cId);

        if (wishListEntry != null) {
            
            wlRep.delete(wishListEntry);
            return true;
        }

        return false;
    }
    @Transactional
    public boolean checkWishlist(Long uId, Long cId) {
        return wlRep.existsByUser_uIdAndOnedayclass_cId(uId, cId);
    }
    
    @Transactional
    public Integer countWishes(Long cId) {
    	return wlRep.findAllByOnedayclass_cId(cId).size();
    }
}
