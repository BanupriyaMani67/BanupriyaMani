import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Support up to 50MB JSON payloads for high-resolution images
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  // API endpoint to permanently save the user's uploaded profile photo to public/
  app.post('/api/save-profile-photo', (req, res) => {
    try {
      const { image } = req.body;
      if (!image) {
        return res.status(400).json({ error: 'No image provided' });
      }

      const base64Str = image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Str, 'base64');

      const publicDir = path.resolve(__dirname, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      // Save both Banupriyamani.p.jpeg and profile.jpg
      fs.writeFileSync(path.join(publicDir, 'Banupriyamani.p.jpeg'), buffer);
      fs.writeFileSync(path.join(publicDir, 'profile.jpg'), buffer);

      // Also copy to dist/ if dist exists
      const distDir = path.resolve(__dirname, 'dist');
      if (fs.existsSync(distDir)) {
        fs.writeFileSync(path.join(distDir, 'Banupriyamani.p.jpeg'), buffer);
        fs.writeFileSync(path.join(distDir, 'profile.jpg'), buffer);
      }

      console.log('Successfully saved profile photo to public/Banupriyamani.p.jpeg and public/profile.jpg');
      res.json({ success: true, message: 'Photo saved permanently to project assets' });
    } catch (err: any) {
      console.error('Error saving profile photo:', err);
      res.status(500).json({ error: err.message || 'Server error' });
    }
  });

  // Serve static files from public/ directly
  app.use(express.static(path.resolve(__dirname, 'public')));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // Mount Vite middlewares in development
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
