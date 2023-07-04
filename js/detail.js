const nav = document.querySelector('#nav');
const serviceCardWraps = document.querySelectorAll('.serviceCardWrap');
const sticky = nav.offsetTop;

//function for the tabs
window.onscroll = function () { stickyFunc() };

const stickyFunc = () => {
    if (window.innerWidth < 700) {
        if (window.scrollY >= sticky) {
            nav.classList.add('sticky');
            nav.style.backgroundColor = '#f7f5ff';
            nav.style.marginTop = '66px';
        } else {
            nav.classList.remove('sticky');
            nav.style.backgroundColor = 'transparent';
            nav.style.marginTop = '0px';
        };
    }
}

// function for the tab and section functionallity
function tabNSec(id) {
    var container = $('body');
    var scrollTo = $('#' + id); // Calculating new position of scrollbar
    var position = scrollTo.offset().top - container.offset().top + container.scrollTop(); // Setting the value of scrollbar
    container.scrollTop(position - 100);

    $('.tab').removeClass('activeTab'); // Remove active class from all tabs
    $('[href="#' + id + '"]').addClass('activeTab'); // Add active class to the clicked tab
}

const addBtns = document.querySelectorAll('.addBtn');
const countDiv = document.querySelectorAll('.countdiv');
const chooseServ = document.querySelector('#chooseServ');
const chosenServ = document.querySelector('#chosenServ');
const minusBtns = document.querySelectorAll('#minusBtn');
const counts = {}; // Object to store count values for each button

const popupContainer = document.querySelector('#popupContainer');
const crossBtn = document.querySelector('#crossBtn');
const nextBtn = document.querySelector('#nextBtn');
const noInput = document.querySelector('#noInput');
let userno = {}

// Iterate over each addBtn
addBtns.forEach((addBtn, index) => {
    const countKey = `count_${index}`; // Generate a unique count key for each button
    counts[countKey] = 0; // Initialize count for the button
    // Attach click event listener to the button
    addBtn.addEventListener('click', () => {
        counts[countKey] += 1; // Increment count for the button

        if (counts[countKey] !== 0) {
            chooseServ.style.display = 'none';
            chosenServ.style.display = 'flex';
            addBtn.innerHTML = '+';
            addBtn.style.width = 'max-content';
            addBtn.style.borderBottomLeftRadius = '0px';
            addBtn.style.borderTopLeftRadius = '0px';
            minusBtns[index].style.display = 'block';
            countDiv[index].innerHTML = counts[countKey];
            countDiv[index].style.display = 'block';
            popupContainer.style.display = 'flex';
            if (localStorage.getItem('userno').length >= 10) {
                popupContainer.style.display = 'none';
            } else {
                popupContainer.style.display = 'flex';
            }
        }


    });

    minusBtns[index].addEventListener('click', () => {
        if (counts[countKey] > 0) {
            counts[countKey] -= 1;
            countDiv[index].innerHTML = counts[countKey]

            if (counts[countKey] === 0) {
                addBtn.innerHTML = 'Add';
                addBtn.style.width = '90px';
                addBtn.style.borderBottomLeftRadius = '0.375rem';
                addBtn.style.borderTopLeftRadius = '0.375rem';
                chooseServ.style.display = 'flex';
                chosenServ.style.display = 'none';
                countDiv[index].style.display = 'none';
                minusBtns[index].style.display = 'none';
            } else {
                countDiv.innerHTML = counts[countKey];
            }
        }
    });
});

crossBtn.addEventListener('click', () => {
    popupContainer.style.display = 'none';
    noInput.value = '+91';
})

nextBtn.addEventListener('click', () => {
    if (noInput.value.length < 13) {
        alert('please enter a valid mobile number');
    } else {
        localStorage.setItem('userno', noInput.value)
        popupContainer.style.display = 'none';
        console.log('this is localstorage', localStorage.getItem('userno'));
    }
})