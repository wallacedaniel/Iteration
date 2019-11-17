<?php

// Load Stylesheet

function loadThemeResources(){
	wp_enqueue_style('style', get_stylesheet_uri());
}

function add_excerpt_view_image($excerpt){
	return $excerpt . '... <a href="' . get_permalink(get_the_ID()) . '">View Image</a>';
}

add_theme_support( 'post-thumbnails' );

add_filter('get_the_excerpt', 'add_excerpt_view_image');
	
add_action('wp_enqueue_scripts', 'loadThemeResources');
register_nav_menu('primary', 'Navigation in the header');
register_nav_menu('secondary', 'Navigation in the footer');




// Filter Sidebar   id="filter1" - 4

function filter_sidebar_init() {
	
	register_sidebar(
		array(
			'name' => esc_html__( 'Filter Sidebar', 'iterationtheme'),
			'id' => 'filter-sidebar',
			'description' => 'Filter Sidebar',
			'before_widget' => '<div class="col-12"><div class="collapse multi-collapse" id="">	<section id"%1$s" class="filter-widget %2$s">',
			'after_widget' => '</section></div></div>',
			'before_title' => '<h2 class="filter-widget-title">',
			'after_title' => '</h2>'
		)
	);
	
}
add_action( 'widgets_init', 'filter_sidebar_init' );