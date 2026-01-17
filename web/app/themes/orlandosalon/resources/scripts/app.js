import domReady from '@roots/sage/client/dom-ready';
import $ from 'jquery';

// Import Bootstrap
import 'bootstrap';

// Import FontAwesome
import { library, dom, text } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faUser, faBagShopping, faArrowUp, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
library.add(faMagnifyingGlass, faUser, faBagShopping, faArrowUp, faArrowLeft, faArrowRight, faInstagram, faFacebook, faTiktok);
dom.watch();

// Import Fancybox
import { Fancybox } from '@fancyapps/ui';

// Import Lenis
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Application entrypoint
 */
domReady(async () => {
  // Register GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Lenis init
  const lenis = new Lenis({
    duration: 1.75,
    lerp: 0.05,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    smooth: true,
    autoRaf: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  /**
   * ALL PAGES
   */
  function allPages() {
    // Hamburger icon init
    // JavaScript to be fired on all pages
    $(".hamburger").on('click', function() {
      $(this).toggleClass("is-active");
    });

    // Scroll to top button init
    document.getElementById('scroll-to-top').addEventListener('click', function(event) {
      event.preventDefault(); // Prevent the default anchor behavior (i.e., the URL change)

      // Get the target section element
      const targetElement = document.getElementById('top');

      // Use Lenis to scroll to the target element
      lenis.scrollTo(targetElement, {
        offset: -200, // Adjust this for custom offsets, if necessary
      });
    });

    // Page loader
    document.addEventListener("DOMContentLoaded", () => {
      const loader = document.getElementById("site-preloader");
      const svg = document.querySelector("#loader-logo");
      const fillLayer = svg.querySelector(".fill-layer");

      // Select ALL drawable shape types
      const shapes = svg.querySelectorAll(
        "path, polygon, polyline, rect, circle, ellipse, line"
      );

      // Optional: uniform stroke-draw reveal prepping
      shapes.forEach(shape => {
        const length = shape.getTotalLength ? shape.getTotalLength() : 0;

        shape.style.strokeDasharray = length;
        shape.style.strokeDashoffset = length;
        shape.style.opacity = 1;
        shape.style.transition = "stroke-dashoffset 1.2s ease-out";
      });

      // Fake loading duration (replace with real progress if available)
      let progress = 0;
      const loadingInterval = setInterval(() => {
        progress += 2; // speed of fill

        // Fill mask grows upward
        fillLayer.style.transform = `translateY(${100 - progress}%)`;

        // Stroke reveal based on progress
        shapes.forEach((shape, index) => {
          const cutoff = (progress / 100) * shapes.length;
          if (index < cutoff) {
            shape.style.strokeDashoffset = 0;
          }
        });

        if (progress >= 100) {
          clearInterval(loadingInterval);
          loader.classList.add("fade-out");

          /*setTimeout(() => {
            loader.remove();
          }, 600);*/
        }
      }, 30);
    });
  }

  /**
   * HOME PAGE
   */
  function homePage() {
    /** START HERO SECTION */

    // Sets constants for header and hero section
    const header = document.getElementById('header');
    const hero = document.getElementById('top-banner');

    // Set height constant of hero section
    const heroHeight = hero.offsetHeight;

    // Listen to the scroll event
    window.addEventListener('scroll', function() {
      // Check if the scroll position is greater than the hero section height
      if (window.scrollY > (heroHeight - 5)) {
        // Add the class when the page scrolls past the hero section
        header.classList.add('scrolled');
      } else {
        // Remove the class if the page scrolls back above the hero section
        header.classList.remove('scrolled');
      }
    });

    // Hero image constant
    const heroImg = document.querySelector('.background-img');

    // Set up section 1 parallax
    gsap.utils.toArray(heroImg).forEach((section, i) => {
      const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;
      
      gsap.fromTo(section,{ 
        y: -heightDiff,
      }, {
        scrollTrigger: {
          trigger: section,
          scrub: true,
        },
        y: 100,
        ease: 'none',
      });
    });

    // Set canvas on window resize
    window.addEventListener('resize', setCanvas);

    // Function that sets the height and width of the canvas
    function setCanvas() {
      // Set viewport variables
      let viewportHeight = window.innerHeight;
      let viewportWidth = window.innerWidth;
    
      // Set videoHeight variables
      let videoHeight = Math.round(viewportWidth / 16 * 9);
      let videoWidth = viewportWidth;
    
      // Set videoHeight and videoWidth if videoHeight <> viewportHeight
      if (videoHeight < viewportHeight) {
        videoHeight = viewportHeight;
        videoWidth = Math.round(videoHeight / 9 * 16);
      } else {
        videoHeight = Math.round(viewportWidth / 16 * 9);
        videoWidth = viewportWidth;
      }

      heroImg.style.height = videoHeight;
      heroImg.style.width = videoWidth;
    }

    /** START SECTION 2 */

    // Animate images with a stronger parallax effect (more movement)
    document.querySelectorAll('.parallax-image').forEach((image, index) => {
      gsap.to(image, {
        y: (index % 3) * 120,  // Increased parallax movement to 120
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });

    // ScrollTrigger for each #parallax-content-block using data-index
    document.querySelectorAll('#parallax-content-block').forEach((contentBlock, index, blocks) => {
      const dataIndex = contentBlock.getAttribute('data-index'); // Get the data-index attribute

      // Track when the #parallax-content-block element becomes active
      ScrollTrigger.create({
        trigger: contentBlock,
        start: 'top center',  // Delay until the content block is in the middle of the viewport
        end: 'bottom top',    // End the trigger when the content block reaches the top of the viewport
        onEnter: () => {
          // Slide in the associated text block when the content block is in view
          const associatedTextBlock = document.querySelector(`.text-block[data-index="${dataIndex}"]`);
          if (associatedTextBlock) {
            gsap.to(associatedTextBlock.querySelector('.content-block'), {
              opacity: 1,
              x: '0%',  // Slide in to the original position
              duration: 0.75,
              ease: 'power2.out',
              delay: 0.5,  // Delay more to trigger the animation after the content block is in the middle
            });
          }
        },
        onLeave: () => {
          // Slide out the associated text block when the content block leaves the viewport
          const associatedTextBlock = document.querySelector(`.text-block[data-index="${dataIndex}"]`);
          if (associatedTextBlock) {
            gsap.to(associatedTextBlock.querySelector('.content-block'), {
              opacity: 0,
              x: '100%',  // Slide out to the right
              duration: 0.75,
              ease: 'power2.in',
            });
          }
        },
        onEnterBack: () => {
          // Slide in the associated text block again when coming back into the viewport
          const associatedTextBlock = document.querySelector(`.text-block[data-index="${dataIndex}"]`);
          if (associatedTextBlock) {
            gsap.to(associatedTextBlock.querySelector('.content-block'), {
              opacity: 1,
              x: '0%',  // Slide in to the original position
              duration: 0.75,
              ease: 'power2.out',
              delay: 0.5,  // Delay to match the slide-in timing
            });
          }
        },
        onLeaveBack: () => {
          // Slide out the associated text block when leaving back
          const associatedTextBlock = document.querySelector(`.text-block[data-index="${dataIndex}"]`);
          if (associatedTextBlock) {
            gsap.to(associatedTextBlock.querySelector('.content-block'), {
              opacity: 0,
              x: '100%',  // Slide out to the right
              duration: 0.75,
              ease: 'power2.in',
            });
          }
        },
      });
    });

    // Styling for initial state of text block (before the animation starts)
    document.querySelectorAll('.text-block .content-block').forEach(box => {
      box.style.opacity = 0;
      box.style.transform = 'translateX(100%)';  // Start from the right
    });
    
    /** START SECTION 3 */

    // Carousel init
    let items = document.querySelectorAll('.carousel .carousel-item');

    items.forEach((el) => {
      const minPerSlide = 4;
      let next = el.nextElementSibling;
      for (var i=1; i<minPerSlide; i++) {
        if (!next) {
          // wrap carousel by using first child
          next = items[0]
        }
        let cloneChild = next.cloneNode(true);
        el.appendChild(cloneChild.children[0]);
        next = next.nextElementSibling;
      }
    });

    // Fancybox init
    Fancybox.bind('[data-fancybox="gallery"]', {
      on: {
        reveal: (fancybox, slide) => {
          // The content of this slide is loaded and ready to be revealed
          slide.contentEl.style.filter = 'brightness(1.25) contrast(1.25)';
        },
      },
    });
  }

  /** 
   * OTHER PAGES
   */
  function otherPage() {
    // Get header and hero section
    const header = document.getElementById('header');
    const pageHeader = document.getElementById('page-header');

    // Get height of hero section
    let pageHeaderHeight;
    if (document.getElementById('above-page-header')) {
      const abovePageHeader = document.getElementById('above-page-header');
      pageHeaderHeight = abovePageHeader.offsetHeight;
    } else {
      pageHeaderHeight = pageHeader.offsetHeight;
    }

    // Listen to the scroll event
    window.addEventListener('scroll', function() {
      // Check if the scroll position is greater than the hero section height
      if (window.scrollY > (pageHeaderHeight)) {
        // Add the class when the page scrolls past the hero section
        header.classList.add('scrolled');
      } else {
        // Remove the class if the page scrolls back above the hero section
        header.classList.remove('scrolled');
      }
    });
  }

  /**
   * WOOCOMMERCE PAGES
   */
  function wooPage() {
    if (document.body.classList.contains('single-product')) {
      if (document.querySelector('.quantity')) {
        // Get the container element where the buttons and input will be placed
        var container = document.querySelector('.quantity');

        // Create the "Decrease" button
        var decreaseButton = document.createElement('button');
        decreaseButton.textContent = '—';
        decreaseButton.classList.add('decrease'); // optional for styling

        // Create the "Increase" button
        var increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.classList.add('increase'); // optional for styling

        // Insert buttons before or after the number input
        container.insertBefore(decreaseButton, container.firstChild);
        container.appendChild(increaseButton);

        // Get the input element
        var input = container.querySelector('.qty');

        // Event listeners to update the input value
        decreaseButton.addEventListener('click', function(e) {
          e.preventDefault();
          input.value = parseInt(input.value) - 1;
        });

        increaseButton.addEventListener('click', function(e) {
          e.preventDefault();
          input.value = parseInt(input.value) + 1;
        });
      }
    }
  }

  // Run all pages function
  allPages();

  // Run home or other page function
  if (document.body.classList.contains('home')) {
    homePage();
  } else {
    otherPage();
  }

  // Run WooCommerce function
  if (document.body.classList.contains('woocommerce')) {
    wooPage();
  }
});

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);
