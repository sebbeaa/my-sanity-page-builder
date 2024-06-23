

## Sanity Visual Block Editor with GrapesJS Integration

**CMS/Studio Version:** 1.1.1

Empower your Sanity Studio with a seamless visual editing experience! This project integrates GrapesJS, a powerful web builder framework, to create an intuitive, customizable editor within your Sanity Studio. Craft beautiful, responsive content with drag-and-drop ease, real-time updates, and extensive design flexibility.

[**Explore the Live Demo**](https://page-builder-front.vercel.app/)

[**View the Production Version Preview**](https://www.sebastianaanstad.com/project/sanity-custom-block-editor)

### Key Features

[Image/video showcasing the editor in action]

- **Visual Drag & Drop:** Effortlessly design and arrange your content using an intuitive drag-and-drop interface.
- **Customization:** Leverage GrapesJS's robust component builder to tailor the editor's look and feel to your exact specifications.
- **Real-Time Updates:** Collaborate seamlessly with your team, seeing changes as they happen in real time.
- **Enhanced Security:** Choose to enable client/server-side encryption to protect your sensitive content.
- **Modern Styling with TailwindCSS:** Style your content with the popular TailwindCSS framework, ensuring a clean, modern aesthetic.
- **Dynamic Floating Panels:** Create custom components directly within the Sanity Studio.
- **Global Components:** Define reusable blocks and components accessible across your entire project.
- **Enhanced Embedding:** Support for custom iframes, Google Maps, ads, and email forms (Nodemailer).

### Coming Soon

- **Improved GrapesJS-Tailwind Parser:** Seamless integration of your custom CSS with Tailwind styles.
- **More Powerful Features:** Stay tuned for future updates with even more exciting capabilities!

### Installation and Deployment (Vercel)

1. **Install Dependencies:**
   ```bash
   pnpm install
   ```
2. **Local Development:**

   ```bash
   pnpm dev
   ```

3. **Build and Start Locally:**

   ```bash
   pnpm build
   pnpm start
   ```

4. **Deploy to Vercel:**
   ```bash
   vercel
   ```

### Configuration (Sanity Studio)

1. Create a new Sanity Studio project using the Sanity CLI or their web interface.
2. Add your project's environment variables to a `.env` file:
   ```
   SANITY_STUDIO_PROJECT_ID='YOUR_PROJECT_ID'
   SANITY_STUDIO_DATASET='YOUR_DATASET'
   SANITY_STUDIO_TOKEN='YOUR_READ_&_WRITE_TOKEN'
   SANITY_STUDIO_URL='YOUR_STUDIO_URL'
   ```
3. **For Deploying and Fetching Variables:** If you're using Vercel to deploy, install their CLI:
   ```bash
   pnpm install vercel@latest
   ```

**Key changes:**

- **Version Updated:** Changed the version number to 1.1.1.
- **Enhanced Embedding Moved:** Shifted "Enhanced Embedding" from "Current Development Focus" to "Key Features" to reflect its release status.
- **Current Development Removed:** Since the previously mentioned features have been released, the "Current Development Focus" section has been removed.
