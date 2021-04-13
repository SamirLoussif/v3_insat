    /**
     * Easy selector function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 16
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * small screen side-nav
     */
    const openNav = () => select("#mySidenav").style.width = "250px";
    const closeNav = () => select("#mySidenav").style.width = "0";

    on('click', '.mobile-nav-btn', () => {
        select('#navbar').classList.toggle('side-nav');
        openNav();
    });

    on('click', '.sidenav .closebtn ', (e) => {
        select('#navbar').classList.toggle('side-nav');
        closeNav();
    });

    /**
     * Click anywhere to close the nav-bar
     */
    on("click", "body", (e) => {
        if (e.target != select(".sidenav") && e.target != select(".mobile-nav-btn")) {
            let navbar = select('#navbar')
            if (navbar.classList.contains('side-nav')) {
                navbar.classList.remove('side-nav');
                closeNav();
            }
        }
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('side-nav')) {
                navbar.classList.remove('side-nav');
                closeNav();
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

    /**
     * Zoomable image-Modal on click
     */

    const addZoom = (img_el, modalID) => {
        // Get the modal
        var modal = select(modalID);
        // Get the image and insert it inside the modal
        var img = select(img_el);
        var modalImg = select(modalID + " .modal-content");
        on("click", img_el, () => {
            modal.style.display = "block";
            modalImg.src = img.src;
        });
        // When the user clicks on (x), close the modal
        on("click", modalID + " .close", () => modal.style.display = "none");

    }
    addZoom("#cba", "#cbaModal");
    addZoom("#mpi", "#mpiModal");

    /**
     * clubs Swiper
     */
    new Swiper('.clubs-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        observer: true,
        observeParents: true,
        slidesPerView: 'auto',
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 60
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 80
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 120
            }
        }
    })

    /****** 
            il y a un probléme si on utilise un swiper dans un tab 
            donc on met le swiper en dehors de tab et on ajoute un listner pour l'afficher en cas de besoin
    *******/
    on("click", ".tabs li#tab4", () => select("div.clubs").style.display = "block");
    on("click", ".tabs .nav li:not(#tab4)", () => select("div.clubs").style.display = "none", true);