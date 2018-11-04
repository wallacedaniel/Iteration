<?php get_header(); ?>	

	<div class="main">
		<div class="intro-content ">
			<div class="license-content row">
				<div class="col-7">
					<p>All works free for download and full creative use.</p>
				</div>
				<div class="license-info col-5">
					<p><a rel="license" target="blank" href="http://creativecommons.org/licenses/by/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by/4.0/80x15.png" /></a><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/StillImage" property="dct:title" rel="dct:type">
					<a rel="license" target="blank" href="http://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution 4.0 International License</a>
				</div>				
			</div>
			<div class="ad-content">
				<h2>Your Ad Here</h2>
			</div>
		</div>
		
		<div class="container iteration-posts-container">
			<?php get_template_part('content'); ?>
		</div>
		
		<div class="container text-center">
		  <a class="btn btn-outline-success iteration-load-more" data-page="1" data-url="<?php echo admin_url('admin-ajax.php');?>">Load More</a>
			<button id="refresh" type="button" class="btn btn-outline-success">Refresh</button>
		</div>
		
		
	</div>
<?php get_footer(); ?>