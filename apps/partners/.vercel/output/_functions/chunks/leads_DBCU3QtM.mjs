import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { z } from "zod";
//#region src/pages/api/leads.ts
var leads_exports = /* @__PURE__ */ __exportAll({
	ALL: () => ALL,
	POST: () => POST,
	prerender: () => false
});
var leadSchema = z.strictObject({
	name: z.string().trim().min(1).max(120),
	company: z.string().trim().min(1).max(160),
	phone: z.string().trim().min(8).max(30).transform((value) => value.replace(/\D/g, "")).refine((value) => value.length >= 10 && value.length <= 13),
	email: z.string().trim().email().max(254).optional()
});
var errorResponse = () => new Response(JSON.stringify({
	success: false,
	message: "Não foi possível enviar seu contato."
}), {
	status: 502,
	headers: { "Content-Type": "application/json" }
});
var POST = async ({ request }) => {
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({
			success: false,
			message: "Dados do contato inválidos."
		}), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	const result = leadSchema.safeParse(body);
	if (!result.success) return new Response(JSON.stringify({
		success: false,
		message: "Dados do contato inválidos."
	}), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	const apiUrl = "http://localhost:3333";
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 5e3);
	try {
		if (!(await fetch(`${apiUrl.replace(/\/$/, "")}/contacts/public`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(result.data),
			signal: controller.signal
		})).ok) return errorResponse();
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch {
		return errorResponse();
	} finally {
		clearTimeout(timeout);
	}
};
var ALL = () => new Response(JSON.stringify({
	success: false,
	message: "Método não permitido."
}), {
	status: 405,
	headers: {
		Allow: "POST",
		"Content-Type": "application/json"
	}
});
//#endregion
//#region \0virtual:astro:page:src/pages/api/leads@_@ts
var page = () => leads_exports;
//#endregion
export { page };
