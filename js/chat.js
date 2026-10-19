var PERSON_CHAT_URL = "https://formspree.io/f/myzplnkw";
var MESSENGER_URL = "https://m.me/mrcmrkrd";

function createChatMessage(text, outgoing) {
  var message = document.createElement("div");
  message.className = outgoing ? "message outgoing" : "message incoming";
  message.textContent = text;
  return message;
}

function chatbotReply(text) {
  var query = text.toLowerCase();
  if (/(hello|hi|hey|kumusta)/.test(query)) {
    return "Hi. Ask me about Mark's skills, projects, contact details, or resume. I stay on this page and do not message him.";
  }
  if (/(skill|stack|tech|react|laravel|vue|wordpress|flutter|dart|python|asp|next|php)/.test(query)) {
    return "Mark builds with PHP, Laravel, Vue.js, React, Next.js, ASP.NET, Python, WordPress, Dart, and Flutter. The full list is in the Skills section.";
  }
  if (/(project|work|portfolio|tripid|glam|aeon|strada|yellow|abino)/.test(query)) {
    return "Selected projects are TripidKard, GlamBook, Aeonsprint Tech, Strada Motorwerks, Yellow Tree Café, and Abino. Open Projects, then View details, for the full page.";
  }
  if (/(contact|email|phone|call|hire|location|where)/.test(query)) {
    return "Email markrodcadayong17@gmail.com, or call +63 945 231 8814 or 0970 383 4385. He is based in Antipolo City, Rizal and San Carlos City, Pangasinan.";
  }
  if (/(resume|cv)/.test(query)) {
    return "The resume is in the Contact section. You can view it or download the PDF.";
  }
  if (/(price|rate|cost|budget|magkano)/.test(query)) {
    return "The price depends on the project. Switch to Chat with Mark and send the details if you want a reply from him.";
  }
  return "I can answer questions about skills, projects, contact info, and the resume. Switch to Chat with Mark if you want him to reply personally.";
}

function initChat() {
  var trigger = document.getElementById("messenger-trigger");
  var popup = document.getElementById("messenger-popup");
  var closeChat = document.getElementById("close-chat");
  var notification = document.getElementById("message-notification");
  var modePanel = document.getElementById("chat-mode");
  var log = document.getElementById("chat-log");
  var composer = document.getElementById("chat-composer");
  var emailField = document.getElementById("chat-email-field");
  var emailInput = document.getElementById("chat-email");
  var messageInput = document.getElementById("chat-input");
  var switchButton = document.getElementById("chat-switch");
  var title = document.getElementById("chat-title");
  var status = document.getElementById("chat-status");
  var choosePerson = document.getElementById("choose-person");
  var chooseBot = document.getElementById("choose-bot");

  if (!(trigger instanceof HTMLElement) || !(popup instanceof HTMLElement) || !(closeChat instanceof HTMLElement)) {
    return;
  }
  if (!(modePanel instanceof HTMLElement) || !(log instanceof HTMLElement) || !(composer instanceof HTMLFormElement)) {
    return;
  }
  if (!(emailField instanceof HTMLElement) || !(emailInput instanceof HTMLInputElement) || !(messageInput instanceof HTMLInputElement)) {
    return;
  }
  if (!(switchButton instanceof HTMLButtonElement) || !(title instanceof HTMLElement) || !(status instanceof HTMLElement)) {
    return;
  }
  if (!(choosePerson instanceof HTMLButtonElement) || !(chooseBot instanceof HTMLButtonElement)) {
    return;
  }

  var mode = "";
  var personEmail = "";

  function setOpen(open) {
    popup.hidden = !open;
    if (open && notification instanceof HTMLElement) {
      notification.style.display = "none";
    }
    if (open && mode !== "") {
      messageInput.focus();
    }
  }

  function addMessage(text, outgoing) {
    log.appendChild(createChatMessage(text, outgoing));
    log.scrollTop = log.scrollHeight;
  }

  function showChoice() {
    mode = "";
    personEmail = "";
    emailInput.value = "";
    messageInput.value = "";
    log.replaceChildren();
    modePanel.hidden = false;
    log.hidden = true;
    composer.hidden = true;
    title.textContent = "Chat";
    status.textContent = "Choose who you want to talk to";
  }

  function startPersonChat() {
    mode = "person";
    modePanel.hidden = true;
    log.hidden = false;
    composer.hidden = false;
    emailField.hidden = false;
    title.textContent = "Mark Rod Cadayong";
    status.textContent = "Messages go directly to Mark";
    switchButton.textContent = "Use chatbot only";
    addMessage("You're chatting with Mark. Add your email, then send your message. He will reply by email. You can also continue on Messenger.", false);
    var messengerButton = document.createElement("button");
    messengerButton.className = "chat-link";
    messengerButton.type = "button";
    messengerButton.textContent = "Open Messenger";
    messengerButton.addEventListener("click", function () {
      window.open(MESSENGER_URL, "_blank", "noopener,noreferrer");
    });
    log.appendChild(messengerButton);
    emailInput.focus();
  }

  function startBotChat() {
    mode = "bot";
    modePanel.hidden = true;
    log.hidden = false;
    composer.hidden = false;
    emailField.hidden = true;
    title.textContent = "Portfolio chatbot";
    status.textContent = "Answers here only. Mark is not notified.";
    switchButton.textContent = "Chat with Mark";
    addMessage("Hi. I'm the portfolio chatbot. Ask about skills, projects, contact details, or the resume.", false);
    messageInput.focus();
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function sendToMark(message, email) {
    return fetch(PERSON_CHAT_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        message: message,
        _replyto: email,
        _subject: "Portfolio chat with Mark"
      })
    }).then(function (response) {
      if (!response.ok) {
        throw new Error("Chat message was not delivered");
      }
    });
  }

  composer.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = messageInput.value.trim();
    if (text.length === 0) {
      return;
    }

    if (mode === "bot") {
      addMessage(text, true);
      messageInput.value = "";
      window.setTimeout(function () {
        addMessage(chatbotReply(text), false);
      }, 350);
      return;
    }

    if (mode !== "person") {
      return;
    }

    var email = personEmail || emailInput.value.trim();
    if (!isValidEmail(email)) {
      addMessage("Add a valid email first so Mark can reply to you.", false);
      emailInput.focus();
      return;
    }

    personEmail = email;
    emailField.hidden = true;
    addMessage(text, true);
    messageInput.value = "";
    messageInput.disabled = true;

    sendToMark(text, email).then(function () {
      addMessage("Sent to Mark. He will reply at " + email + ".", false);
    }).catch(function () {
      addMessage("That message did not send. Try again, or use Open Messenger.", false);
    }).finally(function () {
      messageInput.disabled = false;
      messageInput.focus();
    });
  });

  choosePerson.addEventListener("click", startPersonChat);
  chooseBot.addEventListener("click", startBotChat);
  switchButton.addEventListener("click", showChoice);
  closeChat.addEventListener("click", function () {
    setOpen(false);
  });

  trigger.addEventListener("click", function () {
    setOpen(popup.hidden);
  });

  trigger.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setOpen(popup.hidden);
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !popup.hidden) {
      setOpen(false);
    }
  });
}

initChat();
