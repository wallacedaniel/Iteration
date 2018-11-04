<?php /*

@package iterationtheme

*/

if ( ! is_active_sidebar( 'filter-sidebar' )) {
	return;
}
?>

<aside id="secondary" class="widget-area" role="complementary">
	<?php dynamic_sidebar( 'filter-sidebar' ); ?>
</aside>
