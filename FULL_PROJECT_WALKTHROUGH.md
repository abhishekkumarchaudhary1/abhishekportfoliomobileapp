# Abhishek's Portfolio Mobile App - Project Walkthrough

This project is a React Native mobile application built with Expo. It serves two main purposes: showcasing Abhishek's professional portfolio and providing a Resume Builder tool for users to create and export their own resumes.

## 🚀 Key Features

### 1. Portfolio Showcase (`PortfolioScreen`)
The main landing screen displaying Abhishek's professional information dynamically loaded from `assets/basicInfo.json`.
- **Profile Section**: Photo, Name, Title, Bio.
- **Contact Links**: Clickable icons for Email, Phone, LinkedIn, GitHub, Website.
- **Projects Gallery**: Cards displaying project details with:
  - Tech stack tags.
  - **Go Live 🚀**: Direct link to the deployed application.
  - **Source Code 💻**: Direct link to the GitHub repository.
- **Skills Section**: Categorized display of technical skills.

### 2. Resume Builder (`ResumeBuilderScreen`)
A powerful tool allowing users to view Abhishek's resume or build their own.

#### View Mode (Default)
- Displays Abhishek's resume formatted for mobile.
- **One-Click Export**: "Export Abhishek's Resume PDF" button generates a clean, professional PDF immediately (No watermark).

#### Edit Mode ("Customize Your Resume")
- Switches the interface to a form-based builder.
- **Editable Sections**:
  - Personal Information (Name, Contact, Links).
  - Experience (Add/Edit/Remove jobs).
  - Education (Add/Edit/Remove degrees).
  - Projects (Add/Edit/Remove projects).
  - Skills (Add/Remove technical skills).
- **Watermark System**:
  - By default, custom resumes are exported with a footer: *"Created using Abhishek's Resume Builder"*.
  - **Passcode Protection**: Users can remove this watermark by selecting "Remove Watermark" and entering the secret code: `expobuilderabhishek`.
  - **Export Flow**: Interactive options menu to choose between Watermarked Export or Clean Export (via passcode).

## 📂 Project Structure

```
abhishekportfoliomobileapp/
├── App.tsx                 # Application Entry Point (Navigation Setup)
├── app.json                # Expo Configuration (Icons, Splash, Name)
├── assets/                 # Static Assets
│   ├── basicInfo.json      # CORE DATA SOURCE for the portfolio
│   ├── icon.png            # App Icon
│   └── splash-icon.png     # Splash Screen
├── src/
│   ├── components/         # Reusable UI Components
│   │   ├── Button.tsx      # Custom styled buttons
│   │   ├── Card.tsx        # Card container with shadow
│   │   ├── Header.tsx      # Screen page headers
│   │   ├── InputField.tsx  # Text input wrapper
│   │   ├── SkillsManager.tsx # UI for adding/removing skills tag
│   │   └── [Forms].tsx     # Education, Experience, Project forms
│   ├── data/
│   │   └── defaultData.ts  # Data Transformation Layer (JSON -> App Types)
│   ├── screens/
│   │   ├── PortfolioScreen.tsx     # Main Portfolio View Logic
│   │   └── ResumeBuilderScreen.tsx # Resume Builder & PDF Logic
│   ├── theme/
│   │   └── index.ts        # Design Tokens (Colors, Typography, Spacing)
│   └── types/              # TypeScript Interfaces
```

## 🛠️ Technical Implementation Details

### Data Management
- The app uses `basicInfo.json` as a single source of truth.
- `defaultData.ts` acts as an adapter, transforming the raw JSON into strictly typed `PortfolioData` and `ResumeData` objects used throughout the app.

### PDF Generation (`expo-print`)
- The app uses `expo-print` to generate PDFs from HTML strings.
- **HTML Template**: A custom HTML/CSS template in `ResumeBuilderScreen.tsx` styles the resume to look like a standard professional A4 document.
- **Conditional Rendering**: The HTML template dynamically decides whether to render the Watermark footer based on the export flow selected.

### Sharing (`expo-sharing`)
- Once the PDF is generated to a temporary URI, `expo-sharing` is used to open the native OS share sheet, allowing users to save to files, email, or share via apps.

## 🏁 Getting Started

1.  **Install Dependencies**:
    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Run the App**:
    ```bash
    npx expo start -c
    ```
    (The `-c` flag clears cache, recommended when changing assets like icons).

3.  **Deploy**:
    This app is configured for Expo EAS.
    ```bash
    eas build
    ```

---
*Generated for Abhishek's Portfolio App*
