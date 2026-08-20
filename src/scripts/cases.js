/* ── case studies: constraint → decision → tradeoff → outcome ── */
const CASES=[
{t:'An incident agent you can watch think',m:'Personal project &middot; 2026',
 sum:'Five SRE tools on Bedrock AgentCore, with its own MCP server for per-prompt metrics.',
 rows:[
 ['Context','I wanted a agentic build where the interesting part was not the model but everything around it: deployment, evaluation, and being able to see what the agent actually did.'],
 ['Constraint','Agent evals are usually unreproducible, because the infrastructure being investigated moves under you. So the mock estate (payments-api, checkout-api, auth-api, notifications) is <b>deterministic</b>, which is what makes a score mean anything run to run.'],
 ['Decision','Five tools (list services, metrics, log search, recent deployments, cost breakdown) on Bedrock AgentCore Runtime, deployed by GitHub Actions over AWS OIDC with no stored keys. Every tool call streams to the browser as it happens rather than resolving into a spinner.'],
 ['Tradeoff','The system prompt is principled rather than scripted, so answers are correct but not identical turn to turn. That means the eval had to score <b>outcome</b> — were the right tools called, did the key facts reach the answer — instead of an exact tool-call sequence. Harder to write, but it does not punish the agent for finding a different valid route.'],
 ['Outcome','<b>8/8</b> eval scenarios passing, run live against Bedrock on every push to main before deploy. The public demo runs in fixture-replay mode through the same code path, so a fresh clone works with zero AWS cost. <a href="https://github.com/sohaibsohail98/sre-investigation-agent" target="_blank" rel="noopener">Source and full design notes</a>.']]},

{t:'Showing what actually reached the model',m:'Personal project &middot; 2026',
 sum:'An MCP server that reports what entered the context window, block by block.',
 rows:[
 ['Context','Built inside the agent above, then extracted once it was obviously useful on its own. Anthropic&rsquo;s &ldquo;Explore the context window&rdquo; page does this for Claude Code; I wanted the same visibility for an arbitrary agent loop.'],
 ['Constraint','Most agent observability re-displays data the interface already showed you. The genuinely invisible part is the ordering and cost of context itself: system prompt, tool specs, reasoning, tool results, final answer, and which of those the end user ever sees.'],
 ['Decision','Eight tools over a real MCP Streamable-HTTP handshake — seven read, one write — so any MCP client can connect, Claude Desktop included. SQLite locally, DynamoDB deployed. Owner token for solo use, or Google sign-in with per-user isolation.'],
 ['Tradeoff','Token counts are <b>labelled estimates, not exact provider usage</b>. Exact accounting would have meant coupling to one provider&rsquo;s billing API and losing the point of an MCP server that works with any agent. Labelling the estimate honestly was the better trade, and it is documented rather than buried.'],
 ['Outcome','A working server anyone can point a client at, and the observability layer behind the panel further up this page. <a href="https://github.com/sohaibsohail98/mcp-context-inspector" target="_blank" rel="noopener">Source and architecture notes</a>.']]},

{t:'An MCP server for a US team, delivered ahead of deadline',m:'Enterprise AI platform · 2025',
 sum:'Foundation infrastructure for an agentic workflow inside a regulated financial services network.',
 rows:[
 ['Context','A US team needed an MCP server for an agentic workflow, inside an enterprise Azure estate with no public ingress permitted.'],
 ['Constraint','Private networking end to end: VNet, private endpoints, container registry and image, with the networking constraints resolved alongside <b>Microsoft&rsquo;s AI Product team</b> rather than worked around.'],
 ['Decision','Build it as reviewable infrastructure rather than a one-off deployment, so the next team could copy the pattern instead of reopening the same conversation with Microsoft.'],
 ['Tradeoff','Slower to first demo than a public endpoint would have been, and it needed Microsoft&rsquo;s input on constraints I could not resolve alone.'],
 ['Outcome','Delivered ahead of deadline and demoed to the CTO. Part of a platform serving <b>200+ engineers</b>, which I ran end to end: DevOps, deployments, and the agentic layer on top.']]},

{t:'Fifty model deployments, thirty minutes down to two',m:'Enterprise AI platform · 93% faster',
 sum:'Azure OpenAI provisioning moved from portal clicks to a declarative pipeline.',
 rows:[
 ['Context','Model deployments were manual, per model and per region, and quota was checked by asking someone.'],
 ['Constraint','Quota is finite and shared. A deployment that does not fit fails halfway through and leaves the estate in a partial state.'],
 ['Decision','A five-stage Python pipeline — quota discovery, capacity weighting, dry-run validation, tfvars generation, apply — with one YAML file per model family driving Terraform.'],
 ['Tradeoff','More moving parts than a hand-written resource block, and the weighting logic needed explaining to anyone maintaining it. Worth it because failures moved to the start of the process.'],
 ['Outcome','<b>50+</b> deployments from declarative config, 30 minutes down to <b>2</b>, and manual provisioning failures eliminated. Open version: <a href="https://github.com/sohaibsohail98/sohaib-terraform-azure-llm" target="_blank" rel="noopener">sohaib-terraform-azure-llm</a>.']]},

{t:'The guardrail was refusing legitimate questions',m:'Multi-agent LLM platform · production incident',
 sum:'The obvious suspect was prompt-attack detection. It was wrong.',
 rows:[
 ['Context','Real user queries were being blocked in production on a multi-agent LLM platform in a regulated sector, where a wrong refusal is a support ticket and a wrong answer is a compliance question.'],
 ['Constraint','No reproducer, and the first hypothesis — prompt-attack detection firing on benign input — was plausible enough that acting on it would have wasted the week.'],
 ['Decision','Build the evidence first: <b>27 test cases and 45 positive controls</b>, run per region and repeated on identical inputs to test whether the detector was even deterministic.'],
 ['Tradeoff','Days spent measuring rather than shipping a fix, against the risk of changing the wrong knob in production and learning nothing.'],
 ['Outcome','Cause was <b>HATE filter strength</b>, not attack detection. PROMPT_ATTACK proved <b>non-deterministic even at LOW</b> — 83% then 94% on identical runs — so it cannot gate a release. One config change across all three regions restored correct results.']]},

{t:'Decommissioning a region without taking anything else down',m:'Multi-brand AWS estate · region exit',
 sum:'A destroy is only as safe as the dependency graph you checked first.',
 rows:[
 ['Context','A cloud region needed decommissioning across a multi-brand estate held in separate repositories and GitHub organisations.'],
 ['Constraint','The asset inventory could not be trusted, and <code class="mono">plan -destroy</code> tells you what changes, not who depends on it.'],
 ['Decision','Audit all <b>160</b> organisation repositories for references before touching anything, then sequence <b>8 PRs</b> across three repositories so each diff was small enough to review properly.'],
 ['Tradeoff','Substantially slower than one large destroy PR. Also surfaced a shared virtual private gateway behind connections that looked independent, which had to be ring-fenced first.'],
 ['Outcome','Region removed with live transit gateway tunnels intact and no unplanned outage. Same approach applied to teardown of <b>11 site-to-site VPN</b> connections across two regions.']]}
];
$('#cases').innerHTML=CASES.map((c,i)=>`
<div class="case">
 <button class="chd" aria-expanded="false" aria-controls="cb${i}">
  <span class="cn">0${i+1}</span>
  <span class="ct"><b>${c.t}</b><span>${c.sum}</span></span>
  <span class="cm">${c.m}</span><span class="cx" aria-hidden="true">+</span>
 </button>
 <div class="cbd" id="cb${i}"><dl class="cin">${c.rows.map(([k,v])=>
  `<dt>${k}</dt><dd class="${k==='Outcome'?'res':''}">${v}</dd>`).join('')}</dl></div>
</div>`).join('');
$('#cases').addEventListener('click',e=>{
  const b=e.target.closest('.chd');if(!b)return;
  const open=b.getAttribute('aria-expanded')==='true';
  b.setAttribute('aria-expanded',String(!open));
  b.parentElement.querySelector('.cbd').classList.toggle('open',!open);
});


/* ── roles ── */
$('#rolelist').innerHTML=[
['2026','Veracross','Senior AI Platform Engineer. Multi-agent LLM platform on Bedrock, an evaluation harness gating every PR, guardrails across three regions, Terraform across a multi-brand AWS estate.'],
['2025–26','LSEG','Senior Cloud &amp; AI Engineer. Ran an enterprise AI platform used by <b>200+ engineers</b> end to end: the DevOps, the deployments, and the agent and MCP server work on top. Unblocked every team onboarding onto it, and took the unresolved AI Foundry problems directly to Microsoft&rsquo;s product team. Built an MCP server with them, delivered early and demoed to the CTO.'],
['2023–25','PwC','Senior DevOps Engineer. Led the Kubernetes workstream for an internal SaaS platform and mentored junior engineers on the team. Shipped an AI compliance application into three tier-one bank environments, plus Landing Zones across AWS and Azure.'],
['2021–22','Capgemini','DevOps Engineer. Serverless and EKS workloads, with DevSecOps scanning wired into four different CI systems.']
].map(([y,c,d])=>`<div class="r"><span class="y">${y}</span><span class="c">${c}</span><span class="d">${d}</span></div>`).join('');

