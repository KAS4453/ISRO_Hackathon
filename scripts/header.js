const header_left_items = [
    {
        id: 0, 
        title: "IISERB ",
        icon: "fa-building-columns",
        link: "https://iiserb.ac.in/"
    },
    {
        id: 1, 
        title: "Library Guide",
        icon: "fa-signs-post",
        link: "Library_Guide_Book.pdf"
    },
    {
        id: 2, 
        title: "Web OPAC",
        icon: "fa-search",
        link: "https://webopac.iiserb.ac.in/"
    },
    {
        id: 3, 
        title: "IRINS",
        icon: "fa-lightbulb",
        link: "https://iiserb.irins.org/"
    },
   
]

const header_right_items = [
    {
        id: 0, 
        icon: "fa-solid fa-address-book",
        link: "../../dropdown-pages-html/about-us/Library-team.html"
    },
    {
        id: 1, 
        icon: "fa-brands fa-twitter",
        link: "https://x.com/libraryiiserb"
    },
    {
        id: 2, 
        icon: "fa-brands fa-facebook",
        link: "https://www.facebook.com/cliiserb/"
    },
    {
        id: 3, 
        icon: "fa-brands fa-google-play",
        link: "https://play.google.com/store/apps/details?id=android1.example1.com.libraryapp&hl=en_IN"
    },
    {
        id: 4, 
        icon: "fa-solid fa-envelope",
        link: "mailto:library@iiserb.ac.in"
    }
  
]
const header_container =  document.querySelector(".header_container");
const header_list_left = document.createElement("ul");
header_list_left.classList.add(
    "flex",
    "md:flex-row",
    "md:gap-6",
    "flex-col"
)

header_left_items.forEach((item, index) => {
    const header_list = document.createElement("li");

    

    header_list.innerHTML += `
    <a href="${item.link}" target="_blank">
        <li class="flex gap-2 items-center">
            <i class="fa-solid ${item.icon}"></i>
            ${item.title}
        </li>
    </a>
    `;
    header_list_left.appendChild(header_list)
})
header_container.appendChild(header_list_left)




const header_list_right = document.createElement("ul");
header_list_right.classList.add(
    "flex",
    "md:flex-row",
    "md:gap-6",
    "flex-col"
)

header_right_items.forEach((item, index) => {
    const header_list = document.createElement("li");

    

    header_list.innerHTML += `
        <a href="${item.link}" target="_blank">
            <li>
              <i class="${item.icon}"></i>
            </li>
        </a>
    `;
    header_list_right.appendChild(header_list)
})
header_container.appendChild(header_list_right)