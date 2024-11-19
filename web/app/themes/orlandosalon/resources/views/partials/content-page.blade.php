<div class="container-fluid ps-5 pe-5" id="container">
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
