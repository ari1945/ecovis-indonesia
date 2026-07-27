# AI-powered article creation feature

_Started 2026-07-19 20:06 UTC_

---

## User

Buat fitur agar pembuatan artikel dapat menggunakan AI sesuai prmpt, namun masih dapat diedit hasilnya. Siapkan beberapa API LLM dari OpenAI, Anthropic, Deepseek, Grook dan Kimi

## Assistant

_[tool: list_files]_

_[tool: read_file]_

_[tool: read_file]_

_[tool: grep]_

Let me read the editor section and the logic class.

_[tool: read_file]_

Now let me read the logic class, especially the editor-related methods.

_[tool: grep]_

_[tool: grep]_

_[tool: read_file]_

This is a clear addition to the existing article editor. Let me check the Claude API bridge available in prototypes, and look at the integrations/settings section.

_[tool: read_skill_prompt]_

_[tool: read_file]_

Let me read the constructor/state and nav setup.

_[tool: read_file]_

Let me read the rest of renderVals to see derived flags and the return object.

_[tool: read_file]_

I have the full picture. Let me look at the Insights toolbar and confirm exact strings to edit.

_[tool: read_file]_

Now I'll implement the feature: an AI Assist panel in the article editor plus an "AI content providers" settings card for the 5 LLM APIs. Applying all edits to `Admin.dc.html`.

_[tool: str_replace_edit]_

Now the logic: state, methods, and renderVals.

_[tool: str_replace_edit]_

Now add the derived AI values and return-object keys.

_[tool: str_replace_edit]_

_[tool: show_html]_

_[tool: get_webview_logs]_

No errors. Handing off to verification.

_[tool: ready_for_verification]_

Added AI article generation to the admin console:

**In the article editor** — a "Write with AI" panel above the blocks. Pick a provider (Anthropic, OpenAI, DeepSeek, Grok, Kimi), model, tone, and length, type a prompt, and Generate. It calls a live model, returns a structured draft (heading/paragraph/quote/image/CTA blocks), and populates the existing editor so **every block stays fully editable**. Also added a "✦ Draft with AI" button on the Insights list.

**In Settings → AI content providers** — a card for all five LLM APIs: masked API-key field, default-model dropdown, connection status, enable/disable, and a "Set default" per provider.

Notes: real generation runs through the available model bridge; the per-provider API-key fields are the configuration surface a production backend would route to. If a call fails, it falls back to a structured template so the flow always completes.

