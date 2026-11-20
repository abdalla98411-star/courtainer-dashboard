export default {
  async fetch(request, env) {
    return new Response(env.API_HOST); // vars and secrets both land on env
  }
}
