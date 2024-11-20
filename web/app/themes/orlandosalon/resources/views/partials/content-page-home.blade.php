<?php if(have_rows('hero_area')) : ?>
    <div class="page-header d-flex" id="top-banner">
        <?php while (have_rows('hero_area')) : the_row(); ?>
            <?php
                $img = get_sub_field('front_image');
                $content = get_sub_field('content');
                $bg = get_sub_field('background_image');
            ?>
            <div class="container-fluid align-self-center z-1">
                <div class="row mt-5">
                    <div class="col-lg-12 text-center">
                        @if(get_sub_field('front_image'))
                            <div class="image-block">
                                <img class="img-fluid front-img" src="<?php echo $img['url'] ?>" alt="<?php echo $img['alt'] ?>" width="<?php echo $img['sizes']['large-width'] ?>" height="<?php echo $img['sizes']['large-height'] ?>">
                            </div>
                        @endif
                        <div class="content-block">
                            <?php echo $content; ?>
                        </div>
                    </div>
                </div>
            </div>

            <div class="background-block">
                <img class="img-fluid background-img" src="<?php echo $bg['url'] ?>" alt="<?php echo $bg['alt'] ?>" width="<?php echo $bg['sizes']['2048x2048-width'] ?>" height="<?php echo $bg['sizes']['2048x2048-height'] ?>">
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>

<div class="container-fluid pt-5 pb-5" id="container">
    <?php if(have_rows('middle_section')) : ?>
        <div class="row" id="section-2">
            <?php while(have_rows('middle_section')) : the_row(); ?>
                <div class="col-lg-12" id="main-content">
                    <div class="row">
                        <?php 
                            $images = get_sub_field('floating_images');
                            if($images) : 
                        ?>
                            <div class="col-lg-8 ps-0">
                                <ul class="row list-unstyled parallax-images">
                                    <?php foreach($images as $image) : ?>
                                        <li class="col-lg-5 parallax-image">
                                            <img class="img-fluid" src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                                        </li>
                                    <?php endforeach; ?>
                                </ul>
                            </div>
                        <?php endif; ?>

                        <?php if(have_rows('text_block')) : ?>
                            <div class="col-lg-4 pe-5">
                                <?php while(have_rows('text_block')) : the_row(); ?>
                                    <div class="text-block">
                                        <h2><?php echo get_sub_field('heading'); ?></h2>
                                        <p><?php echo get_sub_field('content'); ?></p>
                                    </div>    
                                <?php endwhile; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>

                <?php if(get_sub_field('closing_content')) : ?>
                    <div class="col-lg-12" id="closing-content">
                        <?php echo get_sub_field('closing_content'); ?>
                    </div>
                <?php endif; ?>
            <?php endwhile; ?>
        </div>
    <?php endif; ?>

    <?php 
        $images = get_field('carousel');
        if($images) : 
    ?>
        <div class="row" id="section-3">
            <div class="col-lg-12" id="carousel-container">
                <div class="row">
                    <?php foreach($images as $image) : ?>
                        <div class="col-md-3">
                            <img class="img-fluid" src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>

            <div class="col-lg-12" id="carousel-toggle">
                <div class="row">
                    <div class="col-lg-4 offset-lg-4 d-flex justify-content-center gap-3">
                        <div class="carousel-prev"><i class="fas fa-arrow-left"></i></div>
                        <div class="carousel-next"><i class="fas fa-arrow-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>
