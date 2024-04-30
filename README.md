## Visual GrapesJS / HTML Editor in the Sanity.io Studio

## VERSION "1.0.3"

In this Sanity Studio project, we've integrated GrapesJS to offer a comprehensive, interactive, and user-friendly visual content / UI editing experience. This setup allows for intuitive drag & drop functionality, extensive customization, global blocks / components, and real-time updates.

### Features

here is a video preview!

[![sneak peak!](https://i.stack.imgur.com/Vp2cE.png)](https://stream.mux.com/r3rIfRUWkSvJjjzrpiLrFxXlR8vXI82lW302Yg00Rt01LI.m3u8?redundant_streams=true)

- **Drag & Drop:** Seamlessly rearrange your content with drag and drop capabilities
- **Customizable:** Fully tailor the editor's appearance and functionality to meet your project's specific needs, leveraging GrapesJS's component builder.
- **Real-Time Updates:** Ensure all users view the most current content with real-time changes.
- **Client/Server-Side Encryption:** Secure your content with encryption, enhancing data privacy.
- **TailwindCSS Integration:** Utilize TailwindCSS for styling, ensuring a consistent and modern design system without side loading any CSS.
- **Dynamic Floating Panels:** Create a robust foundation for a very customizable component builder within the studio itself, leveraging the best of GrapesJS.
- **Global Components / blocks:** Add global blocks / components in the studio!

### Todo

- [ ] Enhance drag & drop functionality for smoother interactions.
- [x] Introduce more customization options for both editors.
- [ ] Implement real-time collaboration features for team editing.
- [ ] Improve server-side encryption for enhanced security / performance (hint: using web workers / a node.js child process would do the trick).
- [ ] Develop comprehensive documentation for easy setup and usage.
- [x] Integrate TailwindCSS and dynamic floating panels for a seamless design experience. thanks to [Ju99ernaut](https://github.com/Ju99ernaut/grapesjs-tailwind)
- [ ] Write the press release
- [ ] Contact the media

### Installation and Deployment

Follow these steps to install and deploy the app in your local environment (ensure pnpm is set up with this project):

```zsh
pnpm i
pnpm dev

pnpm build
pnpm start

pnpm deploy
```

### Configuration

Define a `.env` or `.env.local` file containing these variables:

```plaintext
SANITY_STUDIO_SECRET=""
SANITY_STUDIO_PROJECT_NAME=""

SANITY_STUDIO_PROJECT_TITLE=""
SANITY_STUDIO_PROJECT_ID=""
SANITY_STUDIO_DATASET=""
```

For deploying and fetching vars, especially if you have another Sanity project setup, you can use Vercel :

```zsh
pnpm i vercel@latest
```

---

git add / stage / commit / sync :

```zsh
git add .
git stage .
git commit -m "Commit message"
git push
```

### Additional Information

For more detailed information on using the custom GrapesJS editor, refer to the project's documentation or the repo owner. This README aims to guide you through the basic setup and highlight the unique features of combining GrapesJS with in Sanity Studio, offering an unparalleled editing experience.
