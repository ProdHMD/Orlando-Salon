<div class="container-fluid ps-lg-5 pe-lg-5 ps-3 pe-3" id="container">
  <div class="row">
    <div class="col-lg-12">
      @php(the_content())
    </div>
  </div>
</div>

@if ($pagination)
  <nav class="page-nav" aria-label="Page">
    {!! $pagination !!}
  </nav>
@endif
