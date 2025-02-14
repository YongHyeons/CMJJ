package org.project.pack.repository;

import java.util.List;

import org.project.pack.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
	
	
	@Query("SELECT c FROM Coupon c "
			+ "JOIN FETCH c.user u "
			+ "WHERE u.uId = :uId "
			+ "AND c.status IN :statuses")
	public List<Coupon> findAllByStatusAndUser_uId(@Param("statuses") List<Integer> statuses,@Param("uId") Long uId);
	
	@Query("SELECT c FROM Coupon c "
			+ "JOIN FETCH c.user u "
			+ "WHERE u.uId = :uId")
	public List<Coupon> findAllByUser_uId(@Param("uId") Long uId);
	
	
	@Query("SELECT c FROM Coupon c "
			+ "WHERE c.code = :code")
	public Coupon findByCode(@Param("code") String code);
	
	@Query("SELECT c FROM Coupon c "
			+ "JOIN FETCH c.user u "
			+ "WHERE c.status = :status "
			+ "AND u.uId = :uId")
	public List<Coupon> findAllByStatusAndUser_uId(@Param("status") Integer status,@Param("uId") Long uId);
	
	@Modifying
	@Query("DELETE FROM Coupon c WHERE c.code = :code AND c.user.uId = :uId")
	public void deleteByCodeAndUser_uId(@Param("code")String code, @Param("uId")Long uId);
	
	@Query("SELECT c FROM Coupon c "
			+ "JOIN FETCH c.user u "
			+ "WHERE c.code = :code "
			+ "AND u.uId = :uId")
	public Coupon findByCodeAndUser_uId(@Param("code")String code, @Param("uId")Long uId);
	
}
