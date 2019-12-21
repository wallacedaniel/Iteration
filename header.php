<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<?php do_action( 'di_blog_the_head' ); ?>
	<?php wp_head(); ?>
	<link rel="stylesheet" href="https://www.iteration.gallery/wp-content/themes/di-blog/assets/css/iteration-cart.css">
</head>
<body <?php body_class(); ?> itemscope itemtype="http://schema.org/WebPage">
<?php
if( function_exists( 'wp_body_open' ) ) {
	wp_body_open();
}
?>

<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'di-blog' ); ?></a>

<?php get_template_part( 'template-parts/sections/header', 'page-loader' ); ?>

<?php get_template_part( 'template-parts/sections/header', 'nav-icons' ); ?>

<?php get_template_part( 'template-parts/sections/header', 'main-logo' ); ?>

<?php get_template_part( 'template-parts/sections/header', 'sidebar-menu' ); ?>

<?php get_template_part( 'template-parts/sections/header', 'hdr-img' ); ?>

<?php get_template_part( 'template-parts/sections/header', 'slider' ); ?>

<?php
if( is_front_page() && get_theme_mod( 'front_slider_endis', '0' ) && get_theme_mod( 'front_slider_tag', '' ) )  {
	get_template_part( 'template-parts/sections/header', 'posts-slider' );
}
?>

<?php
if( get_theme_mod( 'archive_infobar_endis', '1' ) ) {
	if( is_archive() || is_search() ) {
		get_template_part( 'template-parts/content', 'archive-info' );
	}
}
?>

<div id="content" class="container-fluid maincontainer"> <!-- header container-fluid start -->
	<div class="container"> <!-- header container start -->
		<div class="row"> <!-- header row start -->
