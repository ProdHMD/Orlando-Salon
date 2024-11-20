import domReady from '@roots/sage/client/dom-ready';

// Import Bootstrap
import 'bootstrap';

// Import FontAwesome
import { library, dom } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass, faUser, faBagShopping, faArrowUp, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faTiktok } from '@fortawesome/free-brands-svg-icons';
library.add(faMagnifyingGlass, faUser, faBagShopping, faArrowUp, faArrowLeft, faArrowRight, faInstagram, faFacebook, faTiktok);
dom.watch();

// Import Fancybox
import { Fancybox } from "@fancyapps/ui";

// Import Lenis
import Lenis from 'lenis';

/**
 * Application entrypoint
 */
domReady(async () => {
  // Fancybox init
  Fancybox.bind("[data-fancybox]", {
    on: {
      reveal: (fancybox, slide) => {
        // The content of this slide is loaded and ready to be revealed
        slide.contentEl.style.filter = "brightness(1.25) contrast(1.25)";
      },
    },
  });

  // Lenis init
  const lenis = new Lenis({
    autoRaf: true,
    smooth: true,  // Enable smooth scrolling
  });

  // JavaScript to scroll to an anchor link without changing the URL
  document.getElementById('scroll-to-top').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default anchor behavior (i.e., the URL change)

    // Get the target section element
    const targetElement = document.getElementById('top');

    // Use Lenis to scroll to the target element
    lenis.scrollTo(targetElement, {
      offset: -110, // Adjust this for custom offsets, if necessary
    });
  });
});

/**
 * @see {@link https://webpack.js.org/api/hot-module-replacement/}
 */
if (import.meta.webpackHot) import.meta.webpackHot.accept(console.error);
