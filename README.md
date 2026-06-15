# 🚀 White-Label AI Chatbot SaaS (MERN + n8n)

A full-stack white-label AI chatbot platform that allows businesses to create, customize, and embed AI chatbots into any website using a single `<script>` tag. The chatbot is powered by **n8n workflows**, making it easy to integrate with OpenAI, Gemini, databases, CRMs, and other automation tools.

---

## ✨ Features

### 🔐 Authentication

* User Registration & Login
* JWT Authentication
* Protected Dashboard Routes
* Persistent Login Sessions

### 🤖 Chatbot Management

* Create and manage chatbot configuration
* Company Name
* Chatbot Name
* Welcome Message
* n8n Webhook URL
* Enable / Disable chatbot

### 🎨 Widget Customization

* Launcher Logo URL
* Primary / Secondary Theme Colors
* Background & Text Colors
* Bottom Left / Bottom Right Position
* Live Widget Preview

### 💬 Embeddable Chat Widget

* Standalone `widget.js`
* Floating launcher button
* Mobile responsive UI
* Real-time messaging
* Typing indicator animation
* Persistent visitor session ID
* Markdown response rendering
* Conversation persistence using `localStorage`

### 🔄 n8n Integration

* Sends messages directly to an n8n Webhook.
* Supports AI Agent memory using a persistent session ID.
* Easy integration with OpenAI, Gemini, Claude, LangChain, and custom workflows.

### 📋 Embed Code Generator

Generate a simple embed snippet:

```html
<script>
  window.__CHATBOT_CONFIG__ = {
    publicBaseUrl: "https://your-api-domain.com"
  };
</script>

<script
  src="https://your-api-domain.com/widget/loader.js"
  data-bot-id="YOUR_BOT_ID">
</script>
```

---

# 🏗️ Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* Axios
* React Hot Toast
* React Icons

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt.js

## AI & Automation

* n8n
* OpenAI / Gemini (via n8n)
* Webhooks


---

# 📁 Project Structure

```text
chatbot-saas/
│
├── client/                     # React Dashboard
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Express Backend
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── utils/
    ├── public/
    │   └── widget/
    │       ├── widget.js
    │       ├── widget.css
    │       └── loader.js
    ├── index.js
    └── package.json
```

---

# ⚙️ Environment Variables

## Backend (`server/.env`)

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
CLIENT_URL=http://localhost:5173
```

## Frontend (`client/.env.local`)

```env
VITE_API_URL=http://localhost:8000/api
```

## Frontend Production (`client/.env.production`)

```env
VITE_API_URL=https://your-render-app.onrender.com/api
```

---

# 🛠️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chatbot-saas.git
cd chatbot-saas
```

---

## 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` and add your environment variables.

Start the backend:

```bash
npm run dev
```

or

```bash
node index.js
```

Backend runs on:

```
http://localhost:8000
```

---

## 3. Setup Frontend

```bash
cd ../client
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---


### Environment Variables

```text
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
CLIENT_URL=https://your-domain.com
```

---

# 🤝 Contributing

Contributions, issues, and feature requests are welcome.

1. Fork the repository.
2. Create your feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Tashik Middha**

* Full Stack Developer
* Machine Learning & AI Enthusiast
* MERN Stack Developer
* n8n & AI Automation Builder

If you found this project useful, consider giving it a ⭐ on GitHub!
