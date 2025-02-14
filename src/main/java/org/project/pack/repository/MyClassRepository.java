package org.project.pack.repository;

import java.util.List;

import org.project.pack.entity.MyClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface MyClassRepository extends JpaRepository<MyClass, Long>{
	
	@Query("SELECT mc FROM MyClass mc " +
	           "JOIN FETCH mc.onedayclass odc " +
	           "JOIN FETCH odc.user u " +
	           "WHERE u.uId = :uId")
	public List<MyClass> findAllByOnedayclass_User_uId(@Param("uId") Long uId);
	
	@Query("SELECT mc FROM MyClass mc " +
	           "JOIN FETCH mc.user u " +
	           "WHERE mc.status = :status AND u.uId = :uId " +
	           "ORDER BY mc.resCId DESC")
	public List<MyClass> findAllByStatusAndUser_uId(@Param("status") Integer status, @Param("uId") Long uId);
	
	@Query("SELECT mc FROM MyClass mc "
			+ "JOIN FETCH mc.user u "
			+ "WHERE u.uId = :uId")
	public List<MyClass> findAllByUser_uId(@Param("uId") Long uId);
}
