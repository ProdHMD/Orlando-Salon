<footer class="footer" id="footer">
    <div class="container-fluid p-lg-5 p-4">
        <div class="row" id="top-content">
            <div class="col-lg-2" id="brand">
                <img src="@asset('images/o1s-logo-footer.png')" alt="{!! $siteName !!}" class="img-fluid" width="253" height="218">
            </div>
            <div class="col-lg-5 offset-lg-1" id="site-map">
                <div class="row">
                    <div class="col-lg-4 col-md-6">
                        {!! wp_nav_menu(['menu' => 'Site Map Menu', 'menu_class' => 'nav', 'menu_id' => 'site-map-menu', 'echo' => false]) !!}
                    </div>
                    <div class="col-lg-8 col-md-6">
                        {!! wp_nav_menu(['menu' => 'Policy Menu', 'menu_class' => 'nav', 'menu_id' => 'policies-menu', 'echo' => false]) !!}
                    </div>
                </div>
            </div>
            <div class="col-lg-4" id="contact-info">
                @php(dynamic_sidebar('sidebar-footer'))
            </div>
        </div>

        <div class="row mt-5" id="bottom-content">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-6 col-6" id="credits"><?php echo '©' . date('Y') . ' Orlando Salon. <br class="d-block d-md-none">All rights reserved.'; ?></div>
                    <div class="col-lg-6 col-6 text-end" id="to-top"><a href="#top" id="scroll-to-top">Back To Top<i class="fas fa-arrow-up"></i></a></div>
                </div>
            </div>
        </div>
    </div>
</footer>
