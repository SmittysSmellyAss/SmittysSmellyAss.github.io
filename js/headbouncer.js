document.addEventListener("DOMContentLoaded", function () {
  var images = document.querySelectorAll(".bouncing-image");
  var container = document.body;

  var bouncingImages = [];
  var isDragging = false;
  var draggedImage = null;
  var lastpointerX = 0, lastpointerY = 0;
  var velocityX = 0, velocityY = 0;
  var lastMoveTime = 0;
  var shakeThreshold = 10;
  var shakeCount = 0;
  var shakeSound = new Audio("based.mp3"); 

  images.forEach(function (image) {
    var posX = Math.random() * (container.offsetWidth - image.offsetWidth);
    var posY = Math.random() * (container.offsetHeight - image.offsetHeight);
    var directionX = 1;
    var directionY = 1;
    var speedX = 2;
    var speedY = 2;
    var rotation = 0;
    var rotationSpeed = Math.random() * 3 + 1;

    bouncingImages.push({
      image: image,
      posX: posX,
      posY: posY,
      directionX: directionX,
      directionY: directionY,
      speedX: speedX,
      speedY: speedY,
      rotation: rotation,
      rotationSpeed: rotationSpeed,
      velocityX: 0,
      velocityY: 0,
      grabbed: false,
    });

    // Make images draggable
    image.addEventListener("pointerdown", function (event) {
      event.preventDefault();
      isDragging = true;
      draggedImage = bouncingImages.find((b) => b.image === event.target);
      lastpointerX = event.clientX;
      lastpointerY = event.clientY;
      velocityX = 0;
      velocityY = 0;
      shakeCount = 0;
    });
  });

  document.addEventListener("pointermove", function (event) {
    event.preventDefault();
    if (isDragging && draggedImage) {
      let currentTime = performance.now();
      let deltaTime = currentTime - lastMoveTime;

      let dx = event.clientX - lastpointerX;
      let dy = event.clientY - lastpointerY;

      draggedImage.posX += dx;
      draggedImage.posY += dy;

      if (deltaTime > 0) {
        velocityX = dx / deltaTime;
        velocityY = dy / deltaTime;
      }

      // Shake Detection
      if (Math.abs(dx) > shakeThreshold || Math.abs(dy) > shakeThreshold) {
        shakeCount++;
        if (shakeCount > 5 && draggedImage.image.src.includes("shake")) {
          shakeSound.play();
          shakeCount = 0; 
        }
      }

      lastpointerX = event.clientX;
      lastpointerY = event.clientY;
      lastMoveTime = currentTime;

      draggedImage.image.style.transform = `translate(${draggedImage.posX}px, ${draggedImage.posY}px)`;
    }
  });

  document.addEventListener("pointerup", function () {
    if (isDragging && draggedImage) {
      draggedImage.speedX = velocityX * 50; 
      draggedImage.speedY = velocityY * 50;
      isDragging = false;
      draggedImage = null;
    }
  });

  function animateImages() {
    bouncingImages.forEach(function (bouncingImage) {
      if (!isDragging || bouncingImage !== draggedImage) {
        bouncingImage.posX += bouncingImage.speedX * bouncingImage.directionX;
        bouncingImage.posY += bouncingImage.speedY * bouncingImage.directionY;
        bouncingImage.rotation += bouncingImage.rotationSpeed;

        if (bouncingImage.posX <= 0 || bouncingImage.posX >= container.offsetWidth - bouncingImage.image.offsetWidth) {
          bouncingImage.directionX *= -1;
          bouncingImage.speedX *= 0.9; // Slow down slightly after bouncing
        }
        if (bouncingImage.posY <= 0 || bouncingImage.posY >= container.offsetHeight - bouncingImage.image.offsetHeight) {
          bouncingImage.directionY *= -1;
          bouncingImage.speedY *= 0.9;
        }

        bouncingImage.image.style.transform = `translate(${bouncingImage.posX}px, ${bouncingImage.posY}px) rotate(${bouncingImage.rotation}deg)`;
      }
    });

    requestAnimationFrame(animateImages);
  }

  animateImages();
});
