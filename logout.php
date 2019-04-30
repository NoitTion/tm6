<?php
		// Four steps to closing a session
		// (i.e. logging out)

		// 1. Find the session
		// require 'include/session.php';
		session_start();
		
		// 2. Unset all the session variables
		$_SESSION = array();
		
		// 3. Destroy the session cookie
		if(isset($_COOKIE[session_name()])) {
			setcookie(session_name(), '', time()-42000, '/');
		}
		
		// 4. Destroy the session
		session_destroy();
		function redirect_to( $location = NULL ) {
            if ($location != NULL) {
                header("Location: {$location}");
                exit;
            }
        }
		redirect_to("home.php");
?>