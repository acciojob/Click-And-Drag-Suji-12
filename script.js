// Your code here.
const container = document.querySelector(".items");
const cubes = document.querySelectorAll(".item");

let isDragging = false;
let activeCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
  const rect = cube.getBoundingClientRect();
  const parentRect = container.getBoundingClientRect();

  cube.style.position = "absolute";
  cube.style.left = rect.left - parentRect.left + "px";
  cube.style.top = rect.top - parentRect.top + "px";
});

cubes.forEach(cube => {
  cube.addEventListener("mousedown", (e) => {
    isDragging = true;
    activeCube = cube;

    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    container.classList.add("active");
  });
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging || !activeCube) return;

  const parentRect = container.getBoundingClientRect();
  let newX = e.clientX - parentRect.left - offsetX;
  let newY = e.clientY - parentRect.top - offsetY;

  const maxX = parentRect.width - activeCube.offsetWidth;
  const maxY = parentRect.height - activeCube.offsetHeight;

  if (newX < 0) newX = 0;
  if (newY < 0) newY = 0;
  if (newX > maxX) newX = maxX;
  if (newY > maxY) newY = maxY;

  activeCube.style.left = newX + "px";
  activeCube.style.top = newY + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
  activeCube = null;
  container.classList.remove("active");
});

