<?php
    session_start();
    
	function redirect_to( $location = NULL ) {
        if ($location != NULL) {
            header("Location: {$location}");
            exit;
        }
    }

	function logged_in() {
		return isset($_SESSION['user_id']);
	}
	function confirm_logged_in() {
		if (!logged_in()) {
            // print_r($_SESSION);
            redirect_to("index.html");
		}
	}
?>
