// 탭메뉴
var tabMenuBox = document.querySelectorAll('.tabMenuBox');
tabMenuBox.forEach((tab) => {
  var tabMenuEl = tab.querySelectorAll(":scope .tabTitle > li > a");
  tabMenuEl.forEach((menu) => {
    menu.addEventListener("click", (e) => {
      e.preventDefault();
      
      const nodes = [...e.target.closest('ul').children];
      // 인덱스
      var elIndex = nodes.indexOf(e.target.closest('li'));
      nodes.forEach((node) => {node.classList.remove('active')});
      nodes[elIndex].classList.add('active');

      // 탭 컨텐츠가 있을 경우
      var tabContents = e.target.closest('.tabMenuBox').querySelector('.tabContents');
      if(tabContents){
        var tabContEl = tabContents.querySelectorAll(':scope > div');
        tabContEl.forEach((cont) => {cont.classList.remove('active')});
        tabContEl[elIndex].classList.add('active');
      }

      // 특정 탭 클릭 시 top 버튼 사라지도록
      if(e.target.closest('.tabMenuHeader')){
        btnTopVisible(elIndex);
      }
    });
  });
});

function btnTopVisible(index){
  var btnTop = document.querySelector('#btnTop');
  index == 0 ? btnTop.classList.remove('visible') : btnTop.classList.add('visible')
}





// 드룹다운
var dropDownMenu = document.querySelectorAll('.dropDown');
var dimmed = document.querySelector('#dimmed');
var parent = '';

dropDownMenu.forEach((dropDown) => {
  var dropDownBoxTitle = dropDown.querySelectorAll('.title span');
  var dropDownBoxCloseButton = dropDown.querySelector('.btnDropDownClose');
  dropDownBoxTitle.forEach((title) => {
    title.addEventListener("click", (e) => {
      parent = e.target.closest('.dropDown');
      parent.classList.toggle("active");
      
      // dimmed 처리 필요 없을 경우
      var noDimmed = parent.classList.contains('noDimmed');
      if(!noDimmed){
        dimmed.classList.toggle("visible");
      }
    });
  });
  
  // 닫기 버튼이 있을 경우, 클릭 시 드롭다운 메뉴 닫기
  if(dropDownBoxCloseButton){
    dropDownBoxCloseButton.addEventListener("click", () => {
      parent.classList.remove("active");
      dimmed.classList.remove("visible");
    });
  }
  // dimmed 클릭 시 드롭다운 메뉴 닫기
  dimmed.addEventListener("click", () => {
    if(parent != ''){
      parent.classList.remove("active");
    }
      dimmed.classList.remove("visible");
  });
});




// urlCopy
function urlCopy(target){
  var alertCopyMsg = document.querySelector('#alertCopyMsg');
  btnShare.addEventListener('click', () => {
    alertCopyMsg.classList.add('visible');

    setTimeout(() => {
      alertCopyMsg.classList.remove('visible');
    }, 1000);
  });
}



// text dropdown
var textDropDown = document.querySelectorAll('.textDropDown');
textDropDown.forEach((menu)=>{
  menu.addEventListener('click', (e)=>{
    var target = e.target.closest('.textDropDown');
    target.classList.toggle('active');
  });
});






function toggleEvent(target, className){
  target.classList.toggle(className);
}






// 디자인 셀렉트
var selected = document.querySelectorAll(".designSelect .selected");
// 셀렉트 박스 선택
selected.forEach((menu) => {
  menu.addEventListener("click", (e) => {
    var parent = e.target.closest('.designSelect');
    parent.classList.toggle('active');
  });
});
// 옵션 선택
var optionList = document.querySelectorAll('.designSelect .optionList > li');
optionList.forEach((option) => {
  option.addEventListener("click", (e) => {
    const nodes = [...e.target.closest('ul').children];

    var elIndex = nodes.indexOf(e.target.closest('li'));
    nodes.forEach((node) => {node.classList.remove('select')});
    nodes[elIndex].classList.add('select');
    
    var parent = e.target.closest('.designSelect');
    parent.classList.remove('active');

    // 텍스트 변경 : p 태그를 변경하니 오작동 할 때가 있어서 span 추가
    var selectTitle = parent.querySelector(":scope .selected span")
    selectTitle.innerText = nodes[elIndex].innerText;

    // customerMain.html 디자인 셀렉트에서 카테고리별 선택 시 스타일 변경
    var categorySort = document.querySelector('.categorySort');
    if(categorySort){
      designSelectToggle(categorySort, nodes[elIndex].innerText);
    }
  });
});

function designSelectToggle(target, text){
  text == '카테고리별' ? target.classList.add('active') : target.classList.remove('active');
}





// 스크롤 탑
var btnTop = document.querySelector('#btnTop');
if(btnTop){
  btnTop.addEventListener('click', () => {
    window.scroll({top: 0,left: 0});
  });
}