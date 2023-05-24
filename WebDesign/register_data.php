<?php
$servername="localhost";
$username="root";
$password="";
$database_name="commercedb";

$conn=mysqli_connect($server_name,$username,$password,$database_name);




if(!$conn)
{
	
	die("Connection Failed:" . mysqli_connect_error());
	
	
}


if(isset($_POST['save']))
	
	{
		
		$username = $_POST ['username'];
		$email = $_POST ['email'];
		$passcode = $_POST ['passcode'];
		
		
		$sql_query = "INSERT INTO entry_details (username,email,passcode) VALUES ('$username', '$email', '$passcode')";
		
		
		
		if(mysqli_query($conn, $sql_query))
		{
			echo "New Details Entry inserted successfully!";
			
		}
		else
			
		{ 
			
			echo "Error: " .$sql . "" . mysqli_error($conn);
		
		}
		
		mysqli_close($conn);
		
	}