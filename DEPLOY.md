# Deployment Guide

This guide describes how to deploy the Docusaurus site to Google Cloud Run.

## Prerequisites

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized.
- A Google Cloud Project.
- Docker installed (optional, if building locally).

## Steps

### 1. Build the Docker Image

You can build the image locally or using Google Cloud Build.

**Option A: Cloud Build (Recommended)**

This builds the image directly on Google Cloud and stores it in the Container Registry (gcr.io) or Artifact Registry.

```bash
# Replace <PROJECT_ID> with your Google Cloud Project ID
gcloud builds submit --tag gcr.io/<PROJECT_ID>/rad-docs
```

**Option B: Local Build**

```bash
docker build -t rad-docs .
```

### 2. Deploy to Cloud Run

Once the image is built and available in the registry (if using Cloud Build), you can deploy it.

```bash
# Replace <PROJECT_ID> with your Google Cloud Project ID
gcloud run deploy rad-docs \
  --image gcr.io/<PROJECT_ID>/rad-docs \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

- `--platform managed`: Uses the fully managed Cloud Run platform.
- `--region us-central1`: Selects the region (you can change this).
- `--allow-unauthenticated`: Makes the service publicly accessible.
- `--port 8080`: Tells Cloud Run that the container listens on port 8080 (which matches our Dockerfile/nginx config).

### 3. Access the Website

After deployment, the command will output a Service URL. You can visit that URL to see your deployed Docusaurus site.

## Notes

- The `Dockerfile` uses a multi-stage build. It first builds the Docusaurus site using Node.js, and then copies the static files to an Nginx image for serving.
- `nginx.conf` is configured to listen on port 8080 and handle routing for the static site.
