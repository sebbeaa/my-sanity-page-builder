## Custom Tiptap Drag & Drop Editor For Sanity Studio

In this Sanity Studio, we have implemented a custom Tiptap editor with drag & drop functionality. This allows for a more interactive and user-friendly content editing experience.

Here are some features of the custom Tiptap editor:

- Drag & Drop: Easily rearrange your content by dragging and dropping elements.
- Customizable: The editor is fully customizable to fit your specific needs.
- Real-time updates: Changes are reflected in real-time, ensuring all users see the most up-to-date content.

For more information on how to use the custom Tiptap editor, please refer to the repo owner

## Installation and Deployment

Follow these steps to install and deploy the app:

```zsh
    #run project in dev mode
    pnpm i
    pnpm dev
    #build / preview prod project
    pnpm build
    pnpm start
    #deploy studio to sanity / vercel
    pnpm deploy
```

remember to define .env file containing these vars

```.env
SANITY_STUDIO_SECRET=""
SANITY_STUDIO_PROJECT_NAME="default"
SANITY_STUDIO_PROJECT_TITLE=""
SANITY_STUDIO_PROJECT_ID=""
SANITY_STUDIO_DATASET=""
```
