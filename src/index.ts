import { Ai } from '@cloudflare/ai';

export interface Env {
  AI: Ai;
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    // Serve frontend
    if (url.pathname === "/") {
      return fetch("https://<your-domain>/public/index.html");
    }

    // API endpoint for chat + image gen
    if (url.pathname === "/api/chat") {
      const { prompt, isImage } = await req.json();

      if (isImage) {
        // Image generation
        const result = await env.AI.run("@cf/stabilityai/stable-diffusion-xl-base-1.0", { prompt });
        return new Response(result, {
          headers: { "content-type": "image/png" },
        });
      } else {
        // Text generation
        const result = await env.AI.run("@cf/meta/llama-3-8b-instruct", {
          messages: [{ role: "user", content: prompt }],
        });
        return Response.json({ reply: result });
      }
    }

    return new Response("Not found", { status: 404 });
  }
};
