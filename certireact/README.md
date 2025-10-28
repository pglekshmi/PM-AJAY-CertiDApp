## Start React Vite
```
    npm create vite@latest my-react-app
 ```

## ADD Tailwind
```
npm install tailwindcss @tailwindcss/vite
```
## On Vite.config.js
```
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
})
```
## On CSS file
```
@import "tailwindcss";
```
