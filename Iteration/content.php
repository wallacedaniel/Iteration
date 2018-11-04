<div class="row">
<?php
	while(have_posts()) : the_post(); ?>
	<div class="col-3 img-container">
		<article>
			<?php if (is_single()): ?>
				<span><?php the_author(); ?> | <?php echo the_category(", "); ?></span>
				<p><?php the_content(); ?></p>
			<?php else: ?>
			
				<p class="img-wrap"><?php the_post_thumbnail( 'medium' ); ?></p>
				
			<?php endif; ?>
			
			
			
			
			
			
			
			
			<div class="image-controls row">
				<div class="col-3"> 
				<div class="btn-group dropup">
				  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					DwnLd
				  </button>
				  <div class="dropdown-menu">
					<div class="row">
						<div class="col-3">
							<a href="#">Sm</a>
						</div>
						<div class="col-3">
							<a href="#">Med</a>
						</div>
						<div class="col-3">
							<a href="#">Lrg</a>
						</div>
						<div class="col-3">
							<a href="#">Full</a>
						</div>
					</div>
				   </div>
				</div>
				</div>
				<div class="col-3"> 
				<div class="btn-group dropup">
				  <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Share
				  </button>
				  <div class="dropdown-menu">
				  </div>
				</div>
				</div>
				<div class="col-3"> 
				<div class="btn-group dropup">
				  <button type="button" class="btn btn-secondary">
					Zoom
				  </button>
				  
				</div>
				</div>
				<div class="col-3"> 
					<div class="btn-group dropup">
					  <button type="button" class="btn btn-secondary" >
						Info
					  </button>				  
					</div>
				</div>
			</div>
						
			<div class="row collapse multi-collapse" id="share-options">
				[Sassy_Social_Share]
			</div>
		
		





		
		</article>
	</div>
<?php
	endwhile;
?>
</div>











				