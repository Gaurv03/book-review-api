# 📚 Book Review API

A RESTful API built with **Node.js**, **TypeScript**, **Express**, and **MongoDB** for managing books and user-submitted reviews. Includes authentication, filtering, pagination, and search functionality.

---

## 🚀 Features

* User Signup, Login, Logout
* Add/View/Update/Delete Books (with filters, sorting, pagination)
* Submit/Update/Delete Reviews (one per user per book)
* Average rating per book
* Fuzzy search by title or author
* JWT-based auth with HTTP-only cookies

---

## 🛠 Tech Stack

* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* JWT + Cookies
* Postman for testing

---

## 📦 Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Gaurv03/book-review-api.git
cd book-review-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the app

```bash
npm run start
```

---

## 🔍 Design Decisions & Assumptions

* **Authentication** uses JWT stored in HTTP-only cookies for security.
* **One review per user per book** is enforced using unique constraints and server-side checks.
* **Pagination** defaults to 10 items per page.
* **Book ratings** are calculated dynamically when fetching book details.
* **Modular folder structure** follows industry best practices for scalability.

---

## 📁 Project Structure

```
src/
├── controllers/
├── models/
├── routes/
├── services/
├── middlewares/
├── utils/
├── config/
├── helper/
└── index.ts
```

---

## 🧰 Testing with Postman

You can import the full Postman collection from:

```
inside postman folder of repo
postman/Book Review API.postman_collection.json
```

---

## 📄 License

MIT – Feel free to use and modify.

---

Made with ❤️ by [@Gaurv03](https://github.com/Gaurv03)
