# Deployment Guide

This guide describes how to deploy the Docusaurus site to Google Cloud Run.

## Prerequisites

- [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed and initialized.
- A Google Cloud Project.
- Docker installed (optional, if building locally).

## Automated Deployment (GitHub Actions)

A GitHub Actions workflow is included to automatically deploy changes to Cloud Run when code is pushed to the `main` branch.

### Setup

1. **Create a Service Account** in Google Cloud Console with the following roles:
   - Cloud Run Admin
   - Service Account User
   - Storage Admin (for Container Registry) or Artifact Registry Writer

2. **Generate a JSON Key** for this Service Account.

3. **Add Secrets to GitHub**:
   Go to your GitHub repository settings -> Secrets and variables -> Actions, and add the following repository secrets:
   - `GCP_PROJECT_ID`: Your Google Cloud Project ID.
   - `GCP_SA_KEY`: The content of the JSON key file you downloaded.

### Workflow

The workflow file is located at `.github/workflows/deploy.yml`. It performs the following steps:
1. Authenticates with Google Cloud using the Service Account key.
2. Builds the Docker image.
3. Pushes the image to Google Container Registry (GCR).
4. Deploys the image to Google Cloud Run.

## Manual Deployment

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
