const messages = [
  "Likes Coffee",
  "Music",
  "Brainy bits",
  "Stocks Research",
  "Enjoying is important!",
  "Live Laugh Love!"
];

const typingText = document.getElementById("typingText");
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentMessage = messages[messageIndex];
  
  if (!isDeleting) {
    typingText.textContent = currentMessage.substring(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentMessage.length) {
      isDeleting = true;
      setTimeout(type, 1250); // pause before deleting
      return;
    }
  } else {
    typingText.textContent = currentMessage.substring(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      isDeleting = false;
      messageIndex = (messageIndex + 1) % messages.length;
    }
  }
  
  const speed = isDeleting ? 40 : 100; // faster delete
  setTimeout(type, speed);
}

type();

function updateClock() {
    const now = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    document.getElementById('localTime').textContent = now + ' IST';
}

updateClock();
setInterval(updateClock, 1000);