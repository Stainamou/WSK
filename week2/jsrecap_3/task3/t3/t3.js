const userAgent = navigator.userAgent;

let browser = "Unknown";
if (userAgent.includes("Chrome")) {
  browser = "Google Chrome";
} else if (userAgent.includes("Firefox")) {
  browser = "Mozilla Firefox";
} else if (userAgent.includes("Safari")) {
  browser = "Apple Safari";
} else if (userAgent.includes("Edge")) {
  browser = "Microsoft Edge";
}

const os = navigator.platform;

let osName = "Unknown";
if (os.includes("Win")) {
  osName = "Windows";
} else if (os.includes("Mac")) {
  osName = "MacOS";
} else if (os.includes("Linux")) {
  osName = "Linux";
}

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const availableWidth = screen.availWidth;
const availableHeight = screen.availHeight;

const dateAndTime = new Date();
const date = dateAndTime.toLocaleDateString("fi-FI", { day: 'numeric', month: 'long', year: 'numeric'});
const time = dateAndTime.toLocaleTimeString("fi-FI", { hour: "2-digit", minute: "2-digit"});

let text = `<p>Browser: ${browser}</p>`;
text += `<p>Operating System: ${osName}</p>`;
text += `<p>Screen Width: ${screenWidth}px</p>`;
text += `<p>Screen Height: ${screenHeight}px</p>`;
text += `<p>Available Width: ${availableWidth}px</p>`;
text += `<p>Available Height: ${availableHeight}px</p>`;
text += `<p>Date: ${date}</p>`;
text += `<p>Time: ${time}</p>`;

document.getElementById("target").innerHTML = text;
