# Deployment Guide

This guide will walk you through deploying your Employee Management System to the live internet. We will deploy the **Database to MongoDB Atlas**, the **Backend to Render**, and the **Frontend to Vercel**.

---

## Step 1: Deploy the Database (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and create a free account.
2. Create a new **Free Cluster** (M0).
3. Once the cluster is created, click **Database Access** on the left menu. Create a new database user and remember the password.
4. Click **Network Access** on the left menu. Add an IP address and select **Allow Access from Anywhere** (`0.0.0.0/0`).
5. Go back to **Databases** and click **Connect** on your cluster.
6. Choose **Connect your application**.
7. Copy the connection string. It will look something like this:
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/employeeDB?retryWrites=true&w=majority`
8. Replace `<password>` with the password you created in step 3. Keep this string safe; we will use it in Step 2.

---

## Step 2: Deploy the Backend (Render)

First, make sure your code is pushed to a **GitHub Repository**.

1. Go to [Render](https://render.com/) and sign in with your GitHub account.
2. Click **New +** at the top right and select **Web Service**.
3. Connect your GitHub repository containing this project.
4. Fill out the settings:
   - **Name:** `employee-backend-api` (or any name)
   - **Root Directory:** `backend` (very important!)
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Scroll down to **Environment Variables** and click **Add Environment Variable**. Add the following:
   - Key: `PORT`, Value: `5000`
   - Key: `MONGODB_URI`, Value: `[Paste your MongoDB connection string from Step 1]`
   - Key: `FRONTEND_URL`, Value: `[Leave blank for now, we will come back to this]`
6. Click **Create Web Service**.
7. Wait a few minutes for it to build and deploy. Once it says "Live", copy the Render URL at the top left (e.g., `https://employee-backend-api.onrender.com`).

---

## Step 3: Deploy the Frontend (Vercel)

1. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
2. Click **Add New...** -> **Project**.
3. Import your GitHub repository.
4. Before clicking Deploy, configure the project:
   - **Framework Preset:** `Vite`
   - **Root Directory:** `frontend` (very important!)
5. Expand the **Environment Variables** section and add:
   - Key: `VITE_API_URL`
   - Value: `[Paste your Render Backend URL from Step 2]/api/v1`
     *(Example: `https://employee-backend-api.onrender.com/api/v1`)*
6. Click **Deploy**.
7. Wait a couple of minutes. Vercel will generate a live URL for your frontend (e.g., `https://employee-frontend.vercel.app`). Copy this URL.

---

## Step 4: Link Frontend to Backend (CORS)

Now that we know the frontend's live URL, we need to tell the backend to accept requests from it.

1. Go back to your **Render Dashboard** and open your Backend web service.
2. Go to the **Environment** tab.
3. Edit the `FRONTEND_URL` variable you created earlier.
4. Set its value to your new Vercel URL (e.g., `https://employee-frontend.vercel.app`). Do not include a trailing slash (`/`).
5. Click **Save Changes**. This will automatically restart your backend.

---

## You're Done! 🎉

Your Employee Management System is now live! 
You can visit your Vercel URL in any browser on any device. Your frontend is talking securely to your backend, and your backend is reading/writing to your cloud MongoDB database!
