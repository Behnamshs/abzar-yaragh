const images = [
 "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
 "https://images.unsplash.com/photo-1504148455328-c376907d081c",
 "https://images.unsplash.com/photo-1581147036324-c1c7d1d4b65f",
 "https://images.unsplash.com/photo-1567016544818-7a42a59a45f2"
];

let index = 0;
const slide = document.getElementById("slide");

document.querySelector(".next").onclick = () => {
  index = (index + 1) % images.length;
  slide.src = images[index];
};

document.querySelector(".prev").onclick = () => {
  index = (index - 1 + images.length) % images.length;
  slide.src = images[index];
};