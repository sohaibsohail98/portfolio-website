/* ── case studies: four, kept short. Problem, what I did, what changed. ── */
const CASES=[
{t:'The guardrail was refusing real questions',m:'LLM platform, production',
 sum:'The obvious suspect was wrong, so I went and measured it.',
 rows:[
 ['Problem','Legitimate user queries were getting blocked in production. Everyone assumed prompt-attack detection was firing on benign input, and acting on that would have burned the week.'],
 ['What I did','Built 27 test cases and 45 positive controls, ran them per region, then repeated them on identical inputs to see whether the detector was even deterministic.'],
 ['Result','It was the HATE filter strength, not attack detection. PROMPT_ATTACK turned out to be non-deterministic even at LOW (83% one run, 94% the next), so it cannot gate a release. One config change across three regions fixed it.']]},

{t:'Fifty model deployments, thirty minutes down to two',m:'Enterprise AI platform',
 sum:'Portal clicks replaced with a pipeline that fails before it starts.',
 rows:[
 ['Problem','Deployments were manual, per model and per region, and you checked quota by asking someone. If it did not fit you found out halfway through, with the estate left in a partial state.'],
 ['What I did','A five stage Python pipeline (quota discovery, capacity weighting, dry run, tfvars generation, apply) with one YAML file per model family driving Terraform.'],
 ['Result','50+ deployments from declarative config and 30 minutes down to 2. More moving parts than a hand written resource block, which is the trade, but failures moved to the start where they are cheap.']]},

{t:'An incident agent you can watch think',m:'Own project',
 sum:'Five SRE tools on Bedrock AgentCore, streaming every call as it investigates.',
 rows:[
 ['Problem','Agent demos are usually unfalsifiable. If the data shifts run to run you cannot score it, and if the reasoning is hidden you cannot tell competence from luck.'],
 ['What I did','Deterministic mock infrastructure so eval scoring stays reproducible, five tools (services, metrics, logs, deployments, cost), and a UI that streams each tool call live instead of showing a spinner.'],
 ['Result','8/8 eval scenarios passing, scored on tool choice and on the facts reaching the answer. One has a false premise: ask which deployment broke checkout-api when none did, and a good answer traces it to the inventory-service dependency rather than inventing one.']]},

{t:'Showing what actually reached the model',m:'Own project',
 sum:'An MCP server that makes context window usage visible for any agent loop.',
 rows:[
 ['Problem','Most agent observability re-shows you data your own interface already had. The genuinely invisible part is what entered context, and how much of it the user never sees.'],
 ['What I did','A drop in MCP server over Streamable HTTP with eight tools, so any client can connect, Claude Desktop included. Token counts are labelled estimates rather than exact usage, documented as a deliberate trade.'],
 ['Result','System prompt, tool specs, reasoning, results and answer, in the order they actually entered context, split by what the user sees versus overhead. Pulled out of the agent above once it was obviously useful on its own.']]}
];
$('#cases').innerHTML=CASES.map((c,i)=>`
<div class="case">
 <button class="chd" aria-expanded="false" aria-controls="cb${i}">
  <span class="cn">0${i+1}</span>
  <span class="ct"><b>${c.t}</b><span>${c.sum}</span></span>
  <span class="cm">${c.m}</span><span class="cx" aria-hidden="true">+</span>
 </button>
 <div class="cbd" id="cb${i}"><dl class="cin">${c.rows.map(([k,v])=>
  `<dt>${k}</dt><dd class="${k==='Result'?'res':''}">${v}</dd>`).join('')}</dl></div>
</div>`).join('');
document.querySelector('#cases').addEventListener('click',e=>{
  const b=e.target.closest('.chd');if(!b)return;
  const open=b.getAttribute('aria-expanded')==='true';
  b.setAttribute('aria-expanded',String(!open));
  b.parentElement.querySelector('.cbd').classList.toggle('open',!open);
});

/* ── roles ── */
$('#rolelist').innerHTML=[
['2026','Veracross','Senior AI Platform Engineer. Multi-agent LLM platform on Bedrock, an eval harness gating every PR, guardrails across three regions, and Terraform across a multi-brand AWS estate.'],
['2025&ndash;26','LSEG','Senior Cloud &amp; AI Engineer. Ran an enterprise AI platform used by <b>200+ engineers</b> end to end: DevOps and deployments, the agentic layer and MCP setup, and unblocking every team onboarding onto it. Escalated to Microsoft&rsquo;s AI Product team to sort out AI Foundry issues.'],
['2023&ndash;25','PwC','Senior DevOps Engineer. Led the Kubernetes workstream for an internal SaaS platform and mentored the juniors on the team. Shipped an AI compliance app into three tier-one bank environments, plus Landing Zones across AWS and Azure.'],
['2021&ndash;22','Capgemini','DevOps Engineer. Serverless and EKS workloads, with DevSecOps scanning wired into four different CI systems.']
].map(([y,c,d])=>`<div class="r"><span class="y">${y}</span><span class="c">${c}</span><span class="d">${d}</span></div>`).join('');
