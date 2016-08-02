package com.dialog.hsbc.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.stereotype.Repository;

import com.dialog.hsbc.dao.HSBCDialogdao;
import com.dialog.hsbc.utils.JDBCDaoException;
import com.dialog.hsbc.utils.ServiceLocator;
import com.dialog.hsbc.utils.ServiceLocatorException;


@Repository("hSBCDialogdao")
public class HSBCDialogdaoimpl implements HSBCDialogdao{
	
	private DataSource dataSource;
	private Connection connection;
	PreparedStatement selectStatement;
	private String selectQuery;
	private ResultSet result ;
	

public HSBCDialogdaoimpl()  {
		
		try {
			dataSource=ServiceLocator.getDataSource("jdbc/VIMDataSource");
			
		} catch (ServiceLocatorException e) {
			
			System.out.println("Container Service not available");
		}//catch block closed
		
	} //method closed
	
	
	@Override
	public int getAnnualLeaveBalance() {
		// TODO Auto-generated method stub
		
		System.out.println("inside annualleave");
		String selectQuery = "select AL_BALANCE from LEAVE_MASTER where Emp_Id=?";

		int balance;
		PreparedStatement selectStatement = null;
				ResultSet result = null;
				try {
					try {
						connection =  dataSource.getConnection();
						connection.setAutoCommit(true);

						selectStatement = connection.prepareStatement(selectQuery);
						selectStatement.setString(1, "67415_FS");
						result = selectStatement.executeQuery();
						
						result.next();
						System.out.println("outout of query" + result.getInt("al_balance"));
						 balance = result.getInt("al_balance");
						
						} finally {
								
							connection.close();
							
						}
				} catch (SQLException e) {

					throw new JDBCDaoException("SQL error while excecuting query: "
							+ selectQuery, e);
				}
				
		
		
				return balance;
	}

}
