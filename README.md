
# academic

Welcome to the **academic** frontend repository\! This project serves as the user-facing interface for the Academi platform, designed to provide a rich, interactive, and responsive experience. It's built with **Next.js**, **TypeScript**, and a robust set of modern web technologies.

-----

## 🚀 Features

  * **Modern UI with Radix UI**: Utilizes a comprehensive suite of accessible, unstyled UI components for a consistent and customizable design system.
  * **Global State Management**: Powered by **Redux Toolkit** for predictable and scalable application state, with `redux-persist` for data persistence.
  * **Robust Form Handling**: Implements **React Hook Form** with **Zod** for powerful and type-safe form validation.
  * **Email Integration**: Features `@emailjs/browser` for client-side email sending.
  * **Interactive Maps**: Integrates **Leaflet** and **React Google Maps API** for dynamic mapping functionalities.
  * **Smooth User Experience**: Enhanced with `@studio-freight/lenis` for smooth scrolling and `tailwindcss-animate` for subtle animations.
  * **Theming**: Supports light and dark modes via `next-themes`.
  * **Notifications**: Provides user feedback with elegant toast notifications from `react-hot-toast` and `sonner`.
  * **API Communication**: Uses **Axios** for efficient and promise-based HTTP requests to the backend.
  

-----

## 🛠️ Technologies Used

  * **Next.js 15**: React framework for production, enabling server-side rendering, static site generation, and API routes.
  * **TypeScript**: Strongly-typed language for enhanced code quality and developer experience.
  * **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
  * **Redux Toolkit**: The official, opinionated, batteries-included toolset for efficient Redux development.
  * **React Hook Form**: Performance-optimized form library for React.
  * **Zod**: TypeScript-first schema declaration and validation library.
  * **Axios**: Popular promise-based HTTP client.
  * **Lucide React**: Beautiful and customizable open-source icons.
  * **Leaflet & React-Leaflet**: Open-source JavaScript library for mobile-friendly interactive maps.


-----

## ⚙️ Getting Started

Follow these steps to get the `academic` frontend running on your local machine.

### Prerequisites

Make sure you have the following installed:

  * **Node.js** (v18 or higher recommended)
  * **pnpm** (preferred for package management)
    If you don't have `pnpm` installed globally, you can install it via npm:
    ```bash
    npm install -g pnpm
    ```

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/Alauddin-24434/academi-frontend
    cd academi-frontend
    ```

2.  **Install dependencies:**

    This project exclusively uses `pnpm` for package management. Install all required dependencies:

    ```bash
    pnpm install
    ```

3.  **Set up Environment Variables (Optional but Recommended):**

    While the `package.json` doesn't directly show reliance on `.env` files for frontend (Next.js handles `NEXT_PUBLIC_` variables), you might need one for API endpoints or other public configuration. If so, create a `.env.local` file in the root of your project:

    ```env
        NEXT_PUBLIC_API_BASE_URL=yor backend  url
        NEXT_PUBLIC_EMAILJS_SERVICE_ID=serviceid
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_id
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=v-4565rtterfcfgf



    ```

    **Remember:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Do not store sensitive information here.

-----

## 🚀 Running the Application

### Development Mode

To start the Next.js development server with hot-reloading:

```bash
pnpm dev
```

The application will typically be available at `http://localhost:3000`. Changes to your code will automatically refresh the browser.

### Building for Production

To create an optimized production build of the application:

```bash
pnpm build
```

This command will compile and optimize your Next.js application, generating the production-ready output in the `.next` directory.

### Starting the Production Server

After building the project, you can serve the production build:

```bash
pnpm start
```

This will run the compiled Next.js application in a production environment.

-----



## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

-----
