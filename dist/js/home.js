(() => {
    const init = () => {
        const section = document.querySelector("#media-steps");
        if (!section || section.dataset.animationReady) return;

        section.dataset.animationReady = "true";

        const steps = section.querySelectorAll(".ms-step");
        const heading = section.querySelector(".ms-heading, .ms-reveal");
        const track = section.querySelector(".ms-track");
        const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reduceMotion || !("IntersectionObserver" in window)) {
            steps.forEach(step => {
                step.classList.remove("opacity-0", "translate-y-8");
                step.classList.add("opacity-100", "translate-y-0");
            });

            if (track) {
                track.classList.remove("scale-x-0");
                track.classList.add("scale-x-100");
            }
            return;
        }

        steps.forEach(step => {
            step.classList.add(
                "opacity-0",
                "translate-y-8",
                "transition-all",
                "duration-700",
                "ease-out"
            );

            step.style.transitionDelay =
                ${Number(step.style.getPropertyValue("--step")) * 130}ms;
        });

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                const element = entry.target;

                if (element === section) {
                    if (track) {
                        track.classList.remove("scale-x-0");
                        track.classList.add("scale-x-100");
                    }
                } else {
                    element.classList.remove("opacity-0", "translate-y-8");
                    element.classList.add("opacity-100", "translate-y-0");
                }

                observer.unobserve(element);
            });
        }, {
            threshold: 0.15,
            rootMargin: "0px 0px -30px 0px"
        });

        observer.observe(section);
        steps.forEach(step => observer.observe(step));
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init, { once: true });
    } else {
        init();
    }
})();