const socket = io();
let username = "";

// التحقق إذا كان الاسم محفوظًا
if (localStorage.getItem("username")) {
    username = localStorage.getItem("username");
    startChat();
}

// عند إدخال الاسم
document.getElementById("start-chat").addEventListener("click", () => {
    const inputName = document.getElementById("username").value.trim();
    if (inputName) {
        username = inputName;
        localStorage.setItem("username", username); // حفظ الاسم
        startChat();
    } else {
        alert("يرجى إدخال اسمك!");
    }
});

// بدء الدردشة
function startChat() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("chat-box").style.display = "flex";
    document.getElementById("messages").innerHTML += `<div>مرحبًا ${username}!</div>`;
}

// إرسال رسالة نصية
document.getElementById("send-message").addEventListener("click", () => {
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value.trim();

    if (message) {
        socket.emit("chat message", { username, message });
        messageInput.value = "";
    }
});

// إرسال ملف PDF
document.getElementById("send-file").addEventListener("click", () => {
    const fileInput = document.getElementById("file-input");
    const file = fileInput.files[0];

    if (file && file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onload = () => {
            socket.emit("file upload", {
                username: username,
                fileName: file.name,
                fileURL: reader.result, // تحويل الملف إلى Base64
            });
        };
        reader.readAsDataURL(file);
        fileInput.value = "";
    } else {
        alert("يرجى اختيار ملف PDF فقط!");
    }
});

// استقبال الرسائل النصية
socket.on("chat message", (data) => {
    const messages = document.getElementById("messages");
    const messageDiv = document.createElement("div");
    messageDiv.innerHTML = `<strong>${data.username}:</strong> ${data.message}`;
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
});

// استقبال الملفات
socket.on("file upload", (data) => {
    const messages = document.getElementById("messages");
    const fileDiv = document.createElement("div");
    fileDiv.innerHTML = `<strong>${data.username}:</strong> <a href="${data.fileURL}" target="_blank">📄 ${data.fileName}</a>`;
    messages.appendChild(fileDiv);
    messages.scrollTop = messages.scrollHeight;
});
