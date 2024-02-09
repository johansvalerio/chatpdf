import type { APIRoute } from "astro";
import {readFile} from "node:fs/promises";



export const POST: APIRoute = async ({ request }) => {
    return new Response(JSON.stringify({
        response: ""
    }))
}