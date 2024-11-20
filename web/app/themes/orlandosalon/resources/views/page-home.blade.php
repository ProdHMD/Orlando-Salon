@extends('layouts.app')

@section('content')
  @while(have_posts()) @php(the_post())
    @includeFirst(['partials.content-page-home', 'partials.content-page'])
  @endwhile
@endsection
