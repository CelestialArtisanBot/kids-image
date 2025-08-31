export default {
  async fetch(request, env) {
    const inputs = {
      prompt: "popular Kids Game random character generation,  full 3D rendering with random theme based on the characters generated",
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
