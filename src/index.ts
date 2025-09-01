export default {
  async fetch(request, env) {
    // Serve a simple HTML page with a refresh button
    if (request.headers.get("accept")?.includes("text/html")) {
      return new Response(
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>AI Image Generator</title>
          <style>
            body { display:flex; flex-direction:column; align-items:center; justify-content:center; font-family:sans-serif; margin-top:50px; }
            img { max-width:90vw; max-height:70vh; margin-bottom:20px; }
            button { padding:10px 20px; font-size:16px; cursor:pointer; }
          </style>
        </head>
        <body>
          <img id="ai-img" src="/image" alt="Generated Image"/>
          <button id="refresh-btn">Refresh</button>
          <script>
            const btn = document.getElementById('refresh-btn');
            const img = document.getElementById('ai-img');
            btn.onclick = () => {
              img.src = '/image?cachebust=' + Date.now();
            };
          </script>
        </body>
        </html>
        `,
        { headers: { "content-type": "text/html" } }
      );
    }

    // Endpoint to generate image
    if (new URL(request.url).pathname === "/image") {
      const inputs = {
        prompt:
          `A high-resolution, full 3D rendering of a legendary **[Nintendo/Sony/Microsoft/Jagex character]**, captured in a hyper-realistic style with dramatic cinematic lighting. The character strikes a dynamic, emotionally charged pose that embodies their core mythos. The environment fuses sci-fi architecture with fantastical terrain—glowing glyphs, arcane machinery, and surreal atmospheric effects. The color palette is vibrant yet harmonized, with radiant highlights and deep shadows that evoke a sense of epic scale and symbolic resonance.`,
      };

      const response = await env.AI.run(
        "@cf/stabilityai/stable-diffusion-xl-base-1.0",
        inputs
      );

      return new Response(response, {
        headers: {
          "content-type": "image/png",
          "x-lore-status": "rendered",
          "x-glyph": "🧿",
          "x-origin": "core-render-shard",
        },
      });
    }

    // Fallback
    return new Response("Not Found", { status: 404 });
  },
} satisfies ExportedHandler<Env>;
