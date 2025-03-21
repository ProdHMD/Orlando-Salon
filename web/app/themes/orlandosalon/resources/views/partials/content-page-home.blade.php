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
                <img class="background-img" src="<?php echo $bg['url'] ?>" alt="<?php echo $bg['alt'] ?>" width="<?php echo $bg['sizes']['2048x2048-width'] ?>" height="<?php echo $bg['sizes']['2048x2048-height'] ?>">
            </div>
        <?php endwhile; ?>
    </div>
<?php endif; ?>

<div class="container-fluid pt-5 pb-5" id="container">
    <?php if(have_rows('middle_section')) : ?>
        <div class="row" id="section-2">
            <?php while(have_rows('middle_section')) : the_row(); ?>
                <div class="col-lg-12" id="main-content">
                    <div class="row justify-content-center" id="scroll-container">
                        <?php 
                            $images = get_sub_field('floating_images');
                            if ($images) :
                        ?>
                            <div class="col-lg-12" id="parallax-container">
                                <?php 
                                    $imageColumns = array_chunk($images, 3);
                                    foreach ($imageColumns as $index => $imageSet) :
                                ?>
                                    <div class="row" id="parallax-content-block" data-index="<?php echo $index + 1; ?>">
                                        <div class="col-lg-8" id="parallax-image-container">
                                            <ul class="row list-unstyled parallax-images">
                                                <?php foreach ($imageSet as $image) : ?>
                                                    <li class="col-lg-4 col-4 parallax-image">
                                                        <img class="img-fluid" src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                                                    </li>
                                                <?php endforeach; ?>
                                            </ul>
                                        </div>

                                        <div class="col-lg-4 d-flex justify-content-center" id="parallax-text-container">
                                            <?php if (have_rows('text_block')) : ?>
                                                <?php $i = 0; while (have_rows('text_block')) : the_row(); ?>
                                                    <?php if ($i == $index) : ?>
                                                        <div class="text-block d-flex flex-column justify-content-center" data-index="<?php echo $i + 1; ?>">
                                                            <div class="content-block">
                                                                <h2><?php echo get_sub_field('heading'); ?></h2>
                                                                <p><?php echo get_sub_field('content'); ?></p>
                                                            </div>
                                                        </div>
                                                    <?php endif; ?>
                                                <?php $i++; endwhile; ?>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    <?php endif; ?>

    <?php 
        $images = get_field('carousel');
        if($images) : 
    ?>
        <div class="row" id="section-3">
            <?php if(get_field('closing_content')) : ?>
                <div class="col-lg-12" id="closing-content">
                    <?php echo get_field('closing_content'); ?>
                </div>
            <?php endif; ?>

            <div class="container-fluid p-0" id="carousel-container">
                <div class="row mx-auto my-auto justify-content-center">
                    <div class="carousel slide p-0" id="carousel-main">
                        <div class="carousel-inner" role="listbox">
                            <?php $i = 0; foreach($images as $image) : ?>
                                <div class="carousel-item<?php if($i == 0) echo ' active'; ?>">
                                    <div class="col-lg-3">
                                        <a href="<?php echo $image['url'] ?>" data-fancybox="gallery">
                                            <img class="img-fluid" src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                                        </a>
                                    </div>
                                </div>
                            <?php $i++; endforeach; ?>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container-fluid" id="carousel-toggle">
                <div class="row">
                    <div class="col-lg-4 offset-lg-4 d-flex justify-content-center gap-3">
                        <a class="carousel-prev carousel-control-prev" href="#carousel-main" data-bs-slide="prev"><i class="fas fa-arrow-left"></i></a>
                        <a class="carousel-next carousel-control-next" href="#carousel-main" data-bs-slide="next"><i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        </div>
    <?php endif; ?>
</div>
