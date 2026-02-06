# 🚀 Quick Start - Run Trendaryo with Admin Panel

## The Problem
You're getting "Invalid credentials" because the backend API server isn't running!

## ✅ Solution - Run Both Frontend & Backend

### Option 1: Install concurrently and run together (Recommended)
```bash
# Install concurrently
npm install

# Run both frontend and backend together
npm run dev:all
```

### Option 2: Run in separate terminals

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

---

## 🔐 Now Login to Admin

Once both are running:

1. Open browser: `http://localhost:8081`
2. Go to: `http://localhost:8081/admin/login`
3. Login with:
   - **Email:** `admin@trendaryo.com`
   - **Password:** `password`

---

## ✅ Verify Backend is Running

You should see in Terminal 2:
```
Server running on port 3001
```

The frontend (port 8081) will proxy API requests to backend (port 3001).

---

## 🔧 Troubleshooting

### Still getting "Invalid credentials"?

1. **Check backend is running:**
   - Look for "Server running on port 3001" message
   - Open `http://localhost:3001/api/admin/login` - should show 404 (that's OK)

2. **Check environment variables:**
   ```bash
   # View your .env file
   type .env
   ```
   Should show ADMIN_EMAIL, ADMIN_PASSWORD_HASH, JWT_SECRET

3. **Check browser console:**
   - Press F12
   - Look for network errors
   - Check if API calls are failing

4. **Restart everything:**
   ```bash
   # Stop all (Ctrl+C)
   # Then restart
   npm run dev:all
   ```

---

## 📝 What's Running?

- **Frontend (Vite):** Port 8081 - Your website
- **Backend (Express):** Port 3001 - API for admin panel

Both need to run for admin login to work!

---

## 🎯 Quick Test

Test if backend is working:
```bash
curl http://localhost:3001/api/admin/login -X POST -H "Content-Type: application/json" -d "{\"email\":\"admin@trendaryo.com\",\"password\":\"password\"}"
```

Should return a token if working correctly.
