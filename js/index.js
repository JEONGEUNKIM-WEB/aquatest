$(document).ready(function () {
  // searchIcon 누르면 인풋창 나옴
  $(".fa-search").click(function () {
    $(this).css({ opacity: "0" });
    $(".searchInput")
      .addClass("active")
      .animate({ width: "150px" }, 300)
      .focus();
  });

  // 다른곳 클릭시 인풋창 사라짐
  $(document).click(function (event) {
    if (!$(event.target).closest(".menu_wrap_rightContent").length) {
      $(".searchInput").removeClass("active");
      $(".fa-search").css({ opacity: "1" });
    }
  });

  // today's show slider
  $(".show_slider_wrap").slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: '<button type="button" class="slick-prev">&lt;</button>',
    nextArrow: '<button type="button" class="slick-next">&gt;</button>',
  });

  // header의 bars 클릭하면 slidemenu 토글
  $(".bars").click(function () {
    $(".slidemenu").slideToggle("slow");
  });

  $(".hBox1").hover(
    function () {
      $(".hBox2, .hBox3, .hBox_txt").hide();
      $(".hBox1_hidden").fadeIn(500);
    },
    function () {
      $(".hBox2, .hBox3, .hBox_txt").fadeIn(700);
      $(".hBox1_hidden").hide();
    }
  );

  $(".hBox2").hover(
    function () {
      $(".hBox1, .hBox3, .hBox_txt").hide();
      $(".hBox1_hidden").fadeIn(500);
    },
    function () {
      $(".hBox1, .hBox3, .hBox_txt").fadeIn(700);
      $(".hBox1_hidden").hide();
    }
  );

  $(".hBox3").hover(
    function () {
      $(".hBox2, .hBox1, .hBox_txt").hide();
      $(".hBox1_hidden").fadeIn(500);
    },
    function () {
      $(".hBox2, .hBox1, .hBox_txt").fadeIn(700);
      $(".hBox1_hidden").hide();
    }
  );
}); // jquery end

//header의 버거바 클릭 시 x로 변환
const bars = document.querySelector(".bars");

bars.addEventListener("click", function () {
  if (bars.classList.contains("open")) {
    bars.classList.remove("open");
  } else {
    bars.classList.add("open");
  }
});

//slidemenu의 슬라이더
let num = 0;
setInterval(slider, 2000);
slider();
function slider() {
  let slideImgs = document.querySelectorAll(".slideImgs");
  for (let i = 0; i < slideImgs.length; i++) {
    slideImgs[i].style.display = "none";
  }
  num++;
  if (num > slideImgs.length) {
    num = 1;
  }
  slideImgs[num - 1].style.display = "block";
}

slider();

// section2 진입 시 텍스트 애니메이트 효과
const section2Txt = document.querySelector(".section2_txt");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // entry.isIntersecting은 요소가 화면에 보이는지 여부를 나타냄
    if (entry.isIntersecting) {
      // 애니메이션 효과를 주기 위해 animate 함수 사용
      section2Txt.animate(
        [
          // 시작 스타일
          { opacity: 0, transform: "translateX(-500px)" },
          // 끝 스타일
          { opacity: 1, transform: "translateX(90px)" },
        ],
        {
          // 애니메이션 옵션
          duration: 1500, // 애니메이션 지속 시간 (ms)
          easing: "ease-out", // 애니메이션 속도 곡선
          fill: "forwards", // 애니메이션 종료 후 요소 상태를 유지
        }
      );
      observer.disconnect();
    } else {
      // 화면에 보이지 않을 때는 요소를 초기 상태로 되돌림
      section2Txt.style.opacity = 0;
      section2Txt.style.transform = "translateX(-500px)";
    }
  });
});

// section2_txt 요소를 관찰
observer.observe(section2Txt);

// today's show thumbnail small에 호버 시 big에 이미지,컨텐츠 나오게하기
document.addEventListener("DOMContentLoaded", function () {
  const thumbnails = document.querySelectorAll(".thumbnail_small");
  const bigThumbnailImg = document.querySelector(".thumbnail_big img");
  const bigThumbnailInfo = document.querySelector(".showInfo");

  thumbnails.forEach((thumbnail) => {
    thumbnail.addEventListener("click", function () {
      const thumbnailImg = thumbnail.querySelector("img").src;
      const thumbnailTitle = thumbnail.querySelector("h2").textContent;
      const thumbnailContent = thumbnail.querySelectorAll("p");
      const thumbnailBtn = thumbnail.querySelector("button");

      let contentHTML = "<h2>" + thumbnailTitle + "</h2>";
      thumbnailContent.forEach((p) => {
        contentHTML += "<p>" + p.textContent + "</p>";
      });

      contentHTML += thumbnailBtn.outerHTML;

      bigThumbnailImg.style.transition = "opacity 0.5s ease-out";
      bigThumbnailInfo.style.transition = "opacity 0.5s ease-out";

      bigThumbnailImg.style.opacity = 0; // 이미지를 투명하게 만들어서 스르륵 나타나도록 함
      bigThumbnailInfo.style.opacity = 0; // 텍스트도 마찬가지로 투명하게 만듦

      setTimeout(function () {
        bigThumbnailImg.src = thumbnailImg;
        bigThumbnailInfo.innerHTML = contentHTML;

        // 투명도를 다시 1로 변경하여 스르륵 나타나도록 함
        bigThumbnailImg.style.opacity = 1;
        bigThumbnailInfo.style.opacity = 1;
      }, 500); //
    });
  });
});

// 스크롤 시 페이드 효과 줄 요소들
window.addEventListener("load", function () {
  const targetElements = document.querySelectorAll(".contentBox, .show_wrap");

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 800, // 애니메이션 지속 시간 (ms)
          easing: "ease-in", // 애니메이션 가속도
          fill: "forwards", // 애니메이션 종료 후 상태를 유지하도록 설정
        });
        observer.unobserve(entry.target);
      }
    });
  });

  targetElements.forEach((element) => {
    observer.observe(element);
  });
});

console.log(window.innerWidth);
