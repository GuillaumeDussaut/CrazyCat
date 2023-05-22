document.addEventListener('DOMContentLoaded', function() {
    const leftEye = document.querySelector('.leftEye');
    const rightEye = document.querySelector('.rightEye');
  
    function createEye() {
      const eye = document.createElement('div');
      eye.classList.add('eye');
      return eye;
    }
  
    const leftEyeElement = createEye();
    const rightEyeElement = createEye();
  
    leftEye.appendChild(leftEyeElement);
    rightEye.appendChild(rightEyeElement);
  
    const leftEyeRect = leftEye.getBoundingClientRect();
    const rightEyeRect = rightEye.getBoundingClientRect();
  
    const leftEyeCenterX = leftEyeRect.left + leftEyeRect.width / 2;
    const leftEyeCenterY = leftEyeRect.top + leftEyeRect.height / 2;
  
    const rightEyeCenterX = rightEyeRect.left + rightEyeRect.width / 2;
    const rightEyeCenterY = rightEyeRect.top + rightEyeRect.height / 2;
  
    const leftEyeRadius = Math.min(leftEyeRect.width, leftEyeRect.height) / 2 - 5;
    const rightEyeRadius = Math.min(rightEyeRect.width, rightEyeRect.height) / 2 - 5;
  
    document.addEventListener('mousemove', function(event) {
      const mouseX = event.clientX;
      const mouseY = event.clientY;
  
      const leftEyeAngle = Math.atan2(mouseY - leftEyeCenterY, mouseX - leftEyeCenterX);
      const rightEyeAngle = Math.atan2(mouseY - rightEyeCenterY, mouseX - rightEyeCenterX);
  
      const leftEyeMaxX = leftEyeCenterX + Math.cos(leftEyeAngle) * leftEyeRadius;
      const leftEyeMaxY = leftEyeCenterY + Math.sin(leftEyeAngle) * leftEyeRadius;
  
      const rightEyeMaxX = rightEyeCenterX + Math.cos(rightEyeAngle) * rightEyeRadius;
      const rightEyeMaxY = rightEyeCenterY + Math.sin(rightEyeAngle) * rightEyeRadius;
  
      const leftEyeX = Math.min(Math.max(mouseX, leftEyeRect.left + 5), leftEyeMaxX - 5);
      const leftEyeY = Math.min(Math.max(mouseY, leftEyeRect.top + 5), leftEyeMaxY - 5);
  
      const rightEyeX = Math.min(Math.max(mouseX, rightEyeRect.left + 5), rightEyeMaxX - 5);
      const rightEyeY = Math.min(Math.max(mouseY, rightEyeRect.top + 5), rightEyeMaxY - 5);
  
      leftEyeElement.style.left = `${leftEyeX - leftEyeRect.left}px`;
      leftEyeElement.style.top = `${leftEyeY - leftEyeRect.top}px`;
  
      rightEyeElement.style.left = `${rightEyeX - rightEyeRect.left}px`;
      rightEyeElement.style.top = `${rightEyeY - rightEyeRect.top}px`;
    });
  });






