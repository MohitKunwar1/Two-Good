function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotive();

function navbar() {
  gsap.to(".nav-bar .left svg", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      markers: false,
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });
  gsap.to(".nav-bar .right .links", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: "#page1",
      scroller: "#main",
      markers: false,
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });
}
navbar();
function media() {
  let media = document.querySelector(".media");
  let button = document.querySelector(".circle");
  media.addEventListener("mouseenter", function () {
    gsap.to(button, {
      scale: 1,
      opacity: 1,
    });
  });
  media.addEventListener("mousemove", function (dets) {
    gsap.to(button, {
      left: dets.x - 70,
      top: dets.y - 80,
    });
  });
  media.addEventListener("mouseleave", function () {
    gsap.to(button, {
      scale: 0,
      opacity: 0,
    });
  });
}
media();

function textanimation() {
  gsap.from("#page1 h1", {
    y: 100,
    opacity: 0,
    duration: 0.5,
    delay: 0.5,
    stagger: 0.2,
    ease: Power3,
  });
  gsap.from("#page1 .media", {
    y: 100,
    // scale:0.9,
    opacity: 0,
    delay: 0.9,
    duration: 0.3,
  });
}
textanimation();

gsap.from("#box1", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  delay: 0.5,
  stagger: 0.2,
  ease: Power3,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    markers: true,
    start: "top 50%",
    end: "bottom 90%",
    markers: false,
  },
});
gsap.from("#box2", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  delay: 0.6,
  stagger: 0.2,
  ease: Power3,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    markers: true,
    start: "top 40%",
    end: "bottom 80%",
    markers: false,
  },
});
gsap.from("#box3", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  delay: 0.7,
  stagger: 0.2,
  ease: Power3,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    markers: true,
    start: "top 30%",
    end: "bottom 70%",
    markers: false,
  },
});
gsap.from("#box4", {
  y: 50,
  opacity: 0,
  duration: 0.5,
  delay: 0.9,
  stagger: 0.2,
  ease: Power3,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "#main",
    markers: true,
    start: "top 20%",
    end: "bottom 60%",
    markers: false,
  },
});

function imgPointer() {
  let pointer = document.querySelector(".crsr");
  let pic = document.querySelectorAll(".box");

  pic.forEach(function (elem) {
    elem.addEventListener("mouseenter", function () {
      gsap.to(pointer, {
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    elem.addEventListener("mousemove", function (dets) {
      gsap.to(pointer, {
        left: dets.x,
        top: dets.y,
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to(pointer, {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}
imgPointer();

const menu = document.querySelector("#hamburger-menu");
const menuBar = document.querySelector("#menu-bar");
menu.addEventListener("click", () => {
  menu.classList.toggle("isactive");
  menuBar.classList.toggle("isactive")
});

