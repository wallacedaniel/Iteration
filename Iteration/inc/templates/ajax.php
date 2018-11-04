<?php

/*

@ package iterationtheme

*/
add_action( 'wp_ajax_nopriv_iteration_load_more', 'iteration_load_more' );
add_action( 'wp_ajax_iteration_load_more', 'iteration_load_more' );


function iteration_load_more() {
	
	$paged = $_POST["page"]+1;
	
	$query = new WP_Query( array(
		'post_type' => 'post',
		'paged' => $paged
	) );
	
	if( $query->have_posts() ):
		//add  if while to home 
		while( $query->have_posts()): $query->the_post();
			// new folder + post format
			<?php get_template_part('content'); ?>
		
		endwhile;
		
	endif;
	
	wp_reset_postdata();
	
	die();
	
}
