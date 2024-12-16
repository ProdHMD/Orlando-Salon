<header class="banner" id="header">
  <nav class="nav-primary navbar navbar-expand-lg" aria-label="{{ wp_get_nav_menu_name('primary_navigation') }}">
    <a class="brand" href="{{ home_url('/') }}">
      <img src="@asset('images/o1s-logo-header.png')" alt="{!! $siteName !!}" class="brand-img img-fluid" width="107" height="92">
    </a>

    <button class="navbar-toggler hamburger hamburger--3dy" type="button" data-bs-toggle="collapse" data-bs-target="#nav-container" aria-controls="nav-container" aria-expanded="false" aria-label="Menu">
      <span class="navbar-toggler-icon hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>

    @if (has_nav_menu('primary_navigation'))
      {!! wp_nav_menu(['theme_location' => 'primary_navigation', 'menu_class' => 'navbar-nav ms-auto', 'container_class' => 'collapse navbar-collapse', 'container_id' => 'nav-container', 'echo' => false]) !!}
    @endif
  </nav>
</header>
