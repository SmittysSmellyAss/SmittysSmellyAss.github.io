
  document.addEventListener('DOMContentLoaded', function() {
    var images = document.querySelectorAll('.bouncing-image');
    var container = document.body;

    var bouncingImages = [];

    images.forEach(function(image) {
      var posX = Math.random() * (container.offsetWidth - image.offsetWidth);
      var posY = Math.random() * (container.offsetHeight - image.offsetHeight);
      var directionX = 1;
      var directionY = 1;
      var speedX = 2;
      var speedY = 2;
      var rotation = 0;
      var rotationSpeed = Math.random() * 5 +1;

      bouncingImages.push({
        image: image,
        posX: posX,
        posY: posY,
        directionX: directionX,
        directionY: directionY,
        speedX: speedX,
        speedY: speedY,
        rotation: rotation,
        rotationSpeed: rotationSpeed
        
      });
    });

    function animateImages() {
      bouncingImages.forEach(function(bouncingImage) {
        bouncingImage.posX += bouncingImage.speedX * bouncingImage.directionX;
        bouncingImage.posY += bouncingImage.speedY * bouncingImage.directionY;
        bouncingImage.rotation += bouncingImage.rotationSpeed;

        if (bouncingImage.posX <= 0 || bouncingImage.posX >= container.offsetWidth - bouncingImage.image.offsetWidth) {
          bouncingImage.directionX *= -1;
        }
        if (bouncingImage.posY <= 0 || bouncingImage.posY >= container.offsetHeight - bouncingImage.image.offsetHeight) {
          bouncingImage.directionY *= -1;
        }

        bouncingImage.image.style.transform = 'translate(' + bouncingImage.posX + 'px, ' + bouncingImage.posY + 'px) rotate(${bouncingImage.rotation})deg)';
      });

      requestAnimationFrame(animateImages);
    }

    images.forEach(function(image) {
      image.addEventListener('click', function() {
        window.location.href = '/cow';
      });
    });

    animateImages();
  });
