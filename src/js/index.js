let observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((element) => {
            if (element.isIntersecting) {
                if (element.target.dataset.name === "element")
                    element.target.classList.add("is-in");

                if (element.target.dataset.name === "page") {
                    console.log(element.target.dataset.name);
                    document
                        .getElementsByClassName("nav-title")
                        [element.target.dataset.page].classList.add("active");
                }
            } else if (!element.isIntersecting) {
                if (element.target.dataset.name === "page")
                    document
                        .getElementsByClassName("nav-title")
                        [element.target.dataset.page].classList.remove(
                            "active"
                        );
            }
        });
    },
    {
        threshold: 0.5,
    }
);

Array.from(document.getElementsByClassName("heading-name")).forEach(
    (element) => {
        observer.observe(element);
    }
);

observer.observe(document.getElementById("about-profile"));
observer.observe(document.getElementById("about-desc"));

Array.from(document.getElementsByClassName("logo")).forEach((element) => {
    observer.observe(element);
});

let pages = [
    document.getElementById("home"),
    document.getElementById("about"),
    document.getElementById("skills"),
    document.getElementById("contacts"),
    document.getElementById("projects"),
];

Array.from(pages).forEach((element) => {
    observer.observe(element);
});

const TypeWritter = function (txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordsIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
};

TypeWritter.prototype.type = function () {
    const current = this.wordsIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.txtElement.textContent = `${this.txt}`;

    let typeSpeed = 300;

    if (this.isDeleting) {
        typeSpeed /= 2;
        this.txtElement.classList.remove("txt-animation");
    }
    if (!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
        this.txtElement.classList.add("txt-animation");
    } else if (this.isDeleting && this.txt === "") {
        this.isDeleting = false;
        this.wordsIndex++;
        typeSpeed = 500;
    }
    setTimeout(() => this.type(), typeSpeed);
};

document.addEventListener("DOMContentLoaded", init);

function init() {
    const txtElement = document.querySelector(".txt");
    let { words, wait } = txtElement.dataset;
    words = JSON.parse(words);

    new TypeWritter(txtElement, words, wait);
}
