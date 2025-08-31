export default {
  async fetch(request, env) {
    const inputs = {
  prompt: "A high-resolution, full 3D rendering of **[Nintendo/Sony/Microsoft/jagex character]** in a realistic style, detailed cinematic lighting, and a dynamic pose that captures the character's essence. The scene is a mix of sci-fi and fantastical elements, with a vibrant color palette.",
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
