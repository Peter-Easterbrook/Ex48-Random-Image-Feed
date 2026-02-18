const container = document.querySelector('.container');
// Using Lorem Picsum API - works without API key
const picsum = 'https://picsum.photos/';

// Configuration - adjust these to control the grid
const imagesPerRow = 4;
const numberOfRows = 4;
const totalImages = imagesPerRow * numberOfRows;

// Load initial images
loadImages();

// Add refresh button functionality
const refreshBtn = document.getElementById('refresh-btn');
if (refreshBtn) {
  refreshBtn.addEventListener('click', () => {
    container.innerHTML = '';
    loadImages();
  });
}

function loadImages() {
  for (let i = 0; i < totalImages; i++) {
    const imgWrapper = document.createElement('div');
    imgWrapper.className = 'img-wrapper';
    
    const img = document.createElement('img');
    const size = getRandomSize();
    // Add random parameter to prevent caching and get different images
    img.src = `${picsum}${size}?random=${Math.random()}`;
    img.alt = `Random image ${i + 1}`;
    img.loading = 'lazy';
    
    // Add loading class
    imgWrapper.classList.add('loading');
    
    // Remove loading class when image loads
    img.addEventListener('load', () => {
      imgWrapper.classList.remove('loading');
      imgWrapper.classList.add('loaded');
    });
    
    // Handle errors
    img.addEventListener('error', () => {
      imgWrapper.classList.remove('loading');
      imgWrapper.classList.add('error');
      img.alt = 'Failed to load image';
    });
    
    imgWrapper.appendChild(img);
    container.appendChild(imgWrapper);
  }
}

function getRandomSize() {
  return `${getRandomNr()}/${getRandomNr()}`;
}

function getRandomNr() {
  return Math.floor(Math.random() * 10) + 300;
}
