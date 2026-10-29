// Apply the saved theme right away (this script loads in <head>) so light mode doesn't flash dark
try {
    if (localStorage.getItem("theme") === "light") {
        document.documentElement.dataset.theme = "light";
    }
} catch (e) {}

document.addEventListener("DOMContentLoaded", function() {
    // ---------------- Theme Toggle ------------------
    var themeToggle = document.getElementById("theme-toggle");

    function updateThemeIcon() {
        var isLight = document.documentElement.dataset.theme === "light";
        // Show the theme you'd switch to
        themeToggle.querySelector("i").className = isLight ? "fa-solid fa-moon" : "fa-solid fa-sun";
    }

    if (themeToggle) {
        updateThemeIcon();
        themeToggle.addEventListener("click", function() {
            var isLight = document.documentElement.dataset.theme === "light";
            if (isLight) {
                delete document.documentElement.dataset.theme;
            } else {
                document.documentElement.dataset.theme = "light";
            }
            try {
                localStorage.setItem("theme", isLight ? "dark" : "light");
            } catch (e) {}
            updateThemeIcon();
        });
    }

    // ---------------- Typing Animation ------------------
    var typingElement = document.querySelector(".typing-text");
    // Phrases come from _data/typing.yml (rendered into the data-phrases attribute)
    var typeArray = typingElement ? JSON.parse(typingElement.dataset.phrases || "[]") : [];
    var index = 0,
        isAdding = true,
        typeIndex = 0;

    function playAnim() {
        setTimeout(
            function() {
                typingElement.innerText = typeArray[typeIndex].slice(0, index);
                // If typing
                if (isAdding) {
                    if (index >= typeArray[typeIndex].length) {
                        isAdding = false;
                        // If text typed completely, wait before starting to remove it.
                        setTimeout(function() {
                            playAnim();
                        }, 2000);
                        return;
                    } else {
                        // Continue to typing text by increasing index
                        index++;
                    }
                } else {
                    // If removing
                    if (index === 0) {
                        isAdding = true;
                        //If text removed completely, move on to next text by increasing typeIndex
                        typeIndex++;
                        if (typeIndex >= typeArray.length) {
                            // Turn to beginning when reached to last text
                            typeIndex = 0;
                        }
                        // Short pause before typing the next text
                        setTimeout(function() {
                            playAnim();
                        }, 400);
                        return;
                    } else {
                        // Continue to removing text by decreasing index
                        index--;
                    }
                }
                // Call the function always
                playAnim();
            },
            // Type slower, remove faster
            isAdding ? 65 : 25
        );
    }

    // Start typing text (only on pages that have it)
    if (typingElement && typeArray.length) {
        playAnim();
    }

    // ---------------- Open external links and PDFs in a new tab ------------------
    document.querySelectorAll("a[href]").forEach(function(link) {
        var isExternal = link.hostname && link.hostname !== window.location.hostname;
        var isPdf = link.pathname.toLowerCase().endsWith(".pdf");
        if (isExternal || isPdf) {
            link.target = "_blank";
            link.rel = "noopener";
        }
    });

    // ---------------- Copy Email ------------------
    var emailCopy = document.getElementById('email-copy');

    if (emailCopy) {
        emailCopy.addEventListener("click", () => {
            navigator.clipboard.writeText("eric.asare@nyu.edu");

            // Add the 'copy-animation' class to trigger the gelatin effect
            emailCopy.classList.add('copy-animation');

            // Remove the 'copy-animation' class after the animation completes
            setTimeout(function() {
                emailCopy.classList.remove('copy-animation');
            }, 500);
        });
    }
});
