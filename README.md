# DeepKlarity - AI Resume Analyzer

![AI Analysis Results](./screenshots/Analysis_page1.png)

DeepKlarity is a full-stack web application designed to help users improve their resumes. It leverages the power of Google's Gemini LLM to automatically extract key information from an uploaded PDF resume, provide a detailed, actionable analysis, and offer personalized feedback for enhancement.

**Live Application Link:** **[https://resume-analyzer-neat3cx9j-siddartharangus-projects.vercel.app/](https://resume-analyzer-neat3cx9j-siddartharangus-projects.vercel.app/)**

---

## Key Features

-   **Instant AI-Powered Analysis:** Upload a PDF resume and receive a comprehensive breakdown of its strengths and weaknesses in seconds.
-   **Structured Data Extraction:** The application intelligently parses and structures information like contact details, work experience, education, skills, and projects.
-   **Actionable Feedback:** Get a resume rating on a 1-10 scale, specific, constructive feedback on each section, and an overall verdict from an AI career coach persona.
-   **Personalized Upskilling Roadmap:** Receive tailored suggestions for new technical or soft skills to learn based on your current profile and career goals.
-   **Persistent History Viewer:** All past analyses are saved to a PostgreSQL database and can be reviewed at any time in a clean, organized table with full details available in a modal view.

## Screenshots

| Upload Page | Analysis Results |
| :---: | :---: |
| ![Resume Upload and Analysis](./screenshots/upload_page.png) | ![Full Analysis Results](./screenshots/Analysis_page1.png) |

| History Viewer | Modal Details |
| :---: | :---: |
| ![Resume History Table](./screenshots/history_page.png) | ![Analysis Details in Modal](./screenshots/Modal_view_page.png) |


## Technology Stack

-   **Frontend:** React.js, Tailwind CSS, Axios
-   **Backend:** Python, FastAPI, SQLAlchemy
-   **Database:** PostgreSQL (Cloud-hosted on NeonDB)
-   **AI / LLM:** Google Gemini API via `google-generativeai`
-   **PDF Parsing:** `pdfplumber`
-   **Deployment:**
    -   Backend deployed on **Render**.
    -   Frontend deployed on **Vercel**.

## How to Set Up and Run Locally

To get a local copy up and running, follow these simple steps.

### Prerequisites

You will need the following tools installed on your machine:
-   [Python](https://www.python.org/) (v3.8 or later)
-   [Node.js](https://nodejs.org/) (v18 or later is recommended)
-   [npm](https://www.npmjs.com/) (comes with Node.js)
-   [Git](https://git-scm.com/)

You will also need to sign up for these free services:
-   A [NeonDB](https://neon.tech/) account for the PostgreSQL database.
-   A [Google AI Studio](https://aistudio.google.com/app/apikey) account to get a Gemini API Key.

### Installation & Setup

1.  **Clone the Repository**
    ```sh
    git clone https://github.com/SiddarthaRangu/resume_analyzer.git
    cd resume_analyzer
    ```

2.  **Setup the Backend (Python)**
    -   Navigate to the backend directory:
        ```sh
        cd backend
        ```
    -   Create and activate a Python virtual environment:
        ```sh
        # For macOS/Linux
        python3 -m venv venv
        source venv/bin/activate

        # For Windows
        python -m venv venv
        .\venv\Scripts\activate
        ```
    -   Install the required packages:
        ```sh
        pip install -r requirements.txt
        ```
    -   Create a `.env` file in the `/backend` directory to store your secret keys:
        ```sh
        touch .env
        ```
    -   Add your credentials to the `backend/.env` file. Use the **Direct Connection** string from NeonDB.
        ```env
        # The URL must start with postgresql:// for SQLAlchemy
        DATABASE_URL="postgresql://YOUR_NEON_USER:PASSWORD@HOST/DB_NAME"
        GOOGLE_API_KEY="YOUR_GEMINI_API_KEY"
        ```

3.  **Setup the Frontend (React)**
    -   Navigate to the frontend directory from the root project folder:
        ```sh
        cd ../frontend
        ```
    -   Install the required npm packages:
        ```sh
        npm install
        ```

### Running the Application

The application requires both the backend and frontend servers to be running simultaneously.

1.  **Start the Backend Server:**
    -   Open a terminal, ensure you are in the `/backend` directory and your virtual environment is activated.
    -   Run the Uvicorn server:
        ```sh
        uvicorn app.main:app --reload
        ```
    -   The server will start and be listening on `http://localhost:8000`.

2.  **Start the Frontend Development Server:**
    -   Open a **second, separate** terminal and navigate to the `/frontend` directory.
    -   Run the React start script:
        ```sh
        npm start
        ```
    -   This will launch the React application, which should automatically open in your web browser at `http://localhost:3000`. You can now use the app!
