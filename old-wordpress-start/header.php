<!--

	WP Template Hieracrchy 
	https://icomoon.io
	
	- submit and close button shows when individual filters closed 
	
	- style alt intro content 
	
	- image width on scroll
	
	-close all widgets button

	- scroll direction button
	
	-scroll image select
	-grid image select

	- image control panel - share(social sassy share) download(multi size) like /findSimilar(frontpage refresh) / details(single) > related / >  advanced
	
	- widgets (search color style tag)
	
	-animate
	
	(Summer ... storage ...8.6k(card 2k save 1.5k caught up 1k  bed 2k(bedrroom<>living)  table 4  vacuum 2 ) ...iteration front end ...travels and trips(country fair   dads(Aug)) ...self care ...consolidate and cards ...storage)
	
	
	1. -icons* -theme png -wp debug* 
	2. -custom admin pages/icons 3. -sub admin pages 4. -admin page custom settings 5. -additional/sanitize admin fields 6. css into admin pages 7. -media upload to admin page 8. -enable post types*

	
	Starry Night Landscape Red Orange  - Failed No File
	
	
	Images responsive 
	
	
	- Week 1  Widget info in
		- style -close
	
	- Week 2 mobile scroll control panel
	
	- Week 3 - Blog v Image Post and Single
	
	- Week 4 Style Drop Menu -Infinite Scroll
	
	- Week 6 Animate
	
	
	- week 7 style
	
	
	font-size: 46px;
	hover:opacity .7
	
	    color: #330c43;
		font weight 300;
		
		
	
	- week 8 other pages	
	
-->

<!DOCTYPE html>
<html lang="en">
	<head>
		<title><?php wp_title(); ?></title>
		<meta charset="UTF-8">
		 <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">		
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
		
		<!-- Link Fonts -->
		<link rel='stylesheet' id='google_fonts-css'  href='//fonts.googleapis.com/css?family=Raleway:300,300italic,600,600italic,800' type='text/css' media='all' />
		<link rel="stylesheet" href="style.css">
		<?php wp_head(); ?>
	</head>
	<body class="container-fluid">
	
			<header>
			
				<?php $tag = ( is_front_page() && is_home() ) ? 'h1' : 'div'; ?>
				<<?php echo $tag; ?> id="site-title"><a href="<?php echo esc_url( home_url() ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home">
					<?php bloginfo( 'name' ); ?>
				</a></<?php echo $tag; ?>>
				
					
				<nav class="navbar navbar-dark menu-header justify-content-end">	
					<div class="nav-button justify-content-end">
				
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
						</button>
					</div>
			
					<div class="collapse" id="navbarToggleExternalContent">
						
						<?php 
						$args = array(
							'theme_location' => 'primary',
							'container_class' => 'nav-links'
						);
						wp_nav_menu($args); 
						?>							
					
					</div>
				</nav>
				<div id="site-description">			
					<?php bloginfo( 'description' ); ?>
					<p>Free For Creative Use</p>
				</div>
				
				<div class="filter-panel">
					<div class="filters-select row">
					  <div class="col-3">
						  <a data-toggle="collapse" href="#filter1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Colors</a>
					  </div>
					  <div class="col-3">
						  <a data-toggle="collapse" href="#filter2" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Tags</a>
					  </div>
					  <div class="col-3">
						  <a data-toggle="collapse" href="#filter3" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Styles</a>
					  </div>
					  <div class="col-3">
						  <a data-toggle="collapse" href="#filter4" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Search</a>
					  </div>
					</div>	

					<div class="row filters">					  
						
							<?php get_sidebar(); ?>
			
					</div>
										
					<div class="filter-button">
						<button id="close" type="button" class="btn btn-outline-success">Close</button>
						
					
					</div>
					<div class="filter-button">
				
						<button id="submit" type="button" class="btn btn-outline-success">Submit</button>
					</div>
					
					
					
				</div>
				
				
			</header>
			
			
	
		
		
		
		
		
		
		

		
		
		
		
		
		
		
		
		
		
		
		