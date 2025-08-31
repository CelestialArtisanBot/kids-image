export default {
  async fetch(request, env) {
    const inputs = {
      prompt: "High-resolution. A few popular Kids Game random character generation. full 3D rendering with random theme based on the characters generated. Capcom, sega, Playstation games,  xbox games, Nintendo games, runescape, roblox, minecraft, etc.. ",
    };

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
