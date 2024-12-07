import domReady from '@roots/sage/client/dom-ready';

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
    duration: 1.2,
    lerp: 0.1,
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

    /** START SECTION 2 */

    // Animate images with parallax effect
    document.querySelectorAll('.parallax-image').forEach((image, index) => {
      gsap.to(image, {
        y: (index % 3) * 50,
        scrollTrigger: {
          trigger: image,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
      });
    });

    // Pinning the text boxes
    gsap.utils.toArray('.text-block').forEach((textBlock, index) => {
      ScrollTrigger.create({
        trigger: textBlock,
        start: () => 'top top',
        end: () => `+50%`,
        pin: true,
        scrub: 1,
        markers: false,
      });

      ScrollTrigger.create({
        trigger: `.parallax-images:nth-child(${index + 1})`,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => {
          textBlock.classList.add('active');
        },
        onLeave: () => {
          textBlock.classList.remove('active');
        },
        onEnterBack: () => {
          textBlock.classList.add('active');
        },
        onLeaveBack: () => {
          textBlock.classList.remove('active');
        },
        markers: false,
      });
    });

    // Styling for active state of text box
    document.querySelectorAll('.text-block').forEach(box => {
      box.style.opacity = 0;
    });

    gsap.fromTo('.text-block', {
      opacity: 1,
    }, {
      opacity: 1,
      duration: 0.75,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.parallax-images',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        markers: false,
      },
    }, '+=1');

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
