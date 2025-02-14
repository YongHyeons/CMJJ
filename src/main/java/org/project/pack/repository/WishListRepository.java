package org.project.pack.repository;

import java.util.List;

import org.project.pack.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface WishListRepository extends JpaRepository<WishList, Long> {
	public WishList findBywLId(Long wLId);
	public WishList findByUser_uId(Long uId);
	public WishList findByOnedayclass_cId(Long cId);
	
	@Query("SELECT w FROM WishList w JOIN FETCH w.user WHERE w.user.uId = :uId")
	public List<WishList> findAllByUser_uId(@Param("uId") Long uId);
	
	@Query("SELECT w FROM WishList w JOIN FETCH w.user JOIN FETCH w.onedayclass WHERE w.user.uId = :uId AND w.onedayclass.cId = :cId")
	public WishList findByuser_uIdAndonedayclass_cId(@Param("uId") Long uId,@Param("cId") Long cId);
	
	@Query("SELECT CASE WHEN COUNT(w) > 0 THEN true ELSE false END FROM WishList w WHERE w.user.uId = :uId AND w.onedayclass.cId = :cId")
	boolean existsByUser_uIdAndOnedayclass_cId(@Param("uId") Long uId, @Param("cId") Long cId);

	@Query("SELECT w FROM WishList w JOIN FETCH w.onedayclass WHERE w.onedayclass.cId = :cId")
	public List<WishList> findAllByOnedayclass_cId(@Param("cId")Long cId);
}
