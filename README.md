## ALPHA VERSION "0.0", USE WITH CAUTION

## Custom Tiptap Drag & Drop Editor For Sanity Studio

In this Sanity Studio, we have implemented a custom Tiptap editor & client / server side encryption + drag & drop functionality. This allows for a more interactive and user-friendly content editing experience.

Here are some features of the custom Tiptap editor:

- Drag & Drop: Easily rearrange your content by dragging and dropping elements.
- Customizable: The editor is fully customizable to fit your specific needs.
- Real-time updates: Changes are reflected in real-time, ensuring all users see the most up-to-date content.

For more information on how to use the custom Tiptap editor, please refer to the repo owner

## Todo

1. Improve drag & drop functionality
2. Add more customization options
3. Implement real-time collaboration feature
4. Improve server-side encryption
5. Write comprehensive documentation
6. Add unit tests
7. Add tailwindcss and dynamic floating panels for each of the blocks / layouts within the editor to avoid side loading any css + create a robust foundation for a very customizable component builder within the studio itself, this could also be leveraged with

## Installation and Deployment

Follow these steps to install and deploy the app:

In your local terminal(remember to set up pnpm with this project)
`

```zsh

    pnpm i
    pnpm dev

    pnpm build
    pnpm start

    pnpm deploy
```

remember to define .env file containing these vars

```
.env || .env.local |

SANITY_STUDIO_SECRET="ed193b2987bacc5b841eb5babda52f4e"
SANITY_STUDIO_PROJECT_NAME="default"
SANITY_STUDIO_PROJECT_TITLE="My Sanity Project"
SANITY_STUDIO_PROJECT_ID="dholx6dc"
SANITY_STUDIO_DATASET="encrypted"



```

you can use vercel to fetch vars if you have another sanity project setup: (you can install vercel globally / use npx, your choice!)

```zsh

    pnpm i vercel@latest


```
