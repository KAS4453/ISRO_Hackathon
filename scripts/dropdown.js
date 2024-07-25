const dropDown = [
  {
    
    id: 1,
    label: "Home",
    icon: "../../images/menubar/home.png",

    options: [
      {
        label: "HomePage",
        link: "../../index.html",
      },
    ],
  },
  {
    id: 1,
    label: "About Us",
    icon: "../../../../images/menubar/info-button.png",
    options: [
      /*{
        label: "About Us",
        link: "",
      }*/
      {
        label: "Our Team",
        link: "../../pages/team.html",
      },
      // {
      //   label: "Contact Us",
      //   link: "#contact",
      // },
    ]
     
  },


  {
    id: 2,
    label: "Nothern East India",
    icon: "../../images/—Pngtree—vector location icon_4231903.png",

   
    options: [
      {
        label: " Arunachal Pradesh",
        link: "../../pages/arunachal_pradesh.html",
      },
      {
        label: " Assam",
        link: "../../pages/assam.html",
      },
      {
        label: " Manipur",
        link: "../../pages/manipur.html",
      },
      {
        label: "Meghalaya",
        link: "../../pages/meghalaya.html",
      },
      {
        label: "Mizoram",
        link: "../../pages/mizoram.html",
      },
     
      {
        label: " Nagaland ",
        link: "../../pages/nagaland.html",
      },
      {
        label: "Sikkim",
        link: "../../pages/sikkim.html",
      },
      {
        label: "Tripura",
        link: "../../pages/tripura.html",
      },
    ],
  },
  
];
var dropDownMobileViewContainer = document.querySelector(".dropdown_mobile_view_container");
var dropDownMobileMenu = document.createElement("div");
dropDownMobileMenu.classList.add("dropdown_mobile_view_option_container");
dropDownMobileViewContainer.appendChild(dropDownMobileMenu)





dropDown.forEach((item, index) => {
  const dropDownItem = document.createElement("div");

  dropDownItem.classList.add("dropdown");  
  // dropDownItem.classList.add("border");  

  dropDownItem.classList.add(`dropdown-${index}`);

  dropDownItem.innerHTML = `
    <span class="flex  shadow-sm hover:border-black border hover:bg-gray-300 transition-all duration-[0.5s] items-center justify-between cursor-pointer  gap-4 " onclick="toggleMobileDropdown(${index})">
      <div class="flex gap-2  items-center">
        <img src="${item.icon}" alt="icon" class="w-5 h-5" />
        ${item.label}
      </div>
      <svg class="w-2.5 h-2.5 ms-3 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
      </svg>
    </span>
    <div class="dropdown-content p-3" id="dropdown-content-${index}">
      ${item.options
        .map(
          (option) =>
            `<a href="${option.link}" target="_blank">
          <li class="dropdown_option rounded-md flex items-center p-2 hover:underline">${option.label}</li></a>`
        )
        .join("")}
    </div>
  `;
  dropDownMobileMenu.appendChild(dropDownItem);
});

function menubar_toggle() {
  // const menubar = document.querySelector(".dropdown_container");
  dropDownMobileViewContainer.classList.toggle("right-0");
}

function toggleMobileDropdown(index) {
  const dropdownnewitem = document.querySelector(`.dropdown-${index}`);
  dropdownnewitem.classList.toggle("active");
}






var dropdownWebView = document.querySelector('.dropdown_web_view')

dropDown.forEach((item, index) => {
  const dropDownWebItem = document.createElement("div");


  dropDownWebItem.classList.add(`dropdown-web-${index}`);


  dropDownWebItem.innerHTML = `
  <div class="relative inline-block text-left">
  <div>
    <button type="button" class="inline-flex w-full justify-center gap-x-1.5  px-3 py-2 text-sm font-semibold text-white   hover:text-white/50" 
    id="menu-button" 
    aria-expanded="true" 
    aria-haspopup="true" 
    onclick="toggleWebDropdown(${index})">
      ${item.label}
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <div class="absolute dropdownWebContent-${index} showHide right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" >
    <div class="py-1" role="none">
       ${item.options
        .map(
          (option) =>
            `
          <a href="${option.link}" target="_blank" class=" hover:bg-gray-200 block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">${option.label}</a>
          `
        )
        .join("")}
      
    </div>
  </div>
</div>
  `;



  dropdownWebView.appendChild(dropDownWebItem);
});

function toggleWebDropdown(index) {

var dropDownMenuButton = document.querySelector(`.dropdown-web-${index}`)
var dropDownWebContent = document.querySelector(`.dropdownWebContent-${index}`)

dropDownWebContent.classList.toggle("showHide");



}

