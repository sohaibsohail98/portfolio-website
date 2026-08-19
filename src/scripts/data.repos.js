const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rd=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc=s=>String(s).replace(/&/g,'&amp;

/* ── repos ── */
const REPOS={
 sre:['sre-investigation-agent',1,'2026','Incident agent with five SRE tools on Bedrock AgentCore. Tool calls stream to the browser over SSE; eight eval scenarios score tool choice as well as the answer.'],
 mci:['mcp-context-inspector',1,'2026','Drop-in MCP server extracted from the agent above into a pip package. Eight tools over session cost and tokens, plus the Context Window Explorer.'],
 halal:['halal-mortgage-calculator',1,'2026','Islamic Home Purchase Plans compared against conventional mortgages. Break-even, stamp duty, joint affordability. No tracking, works offline.'],
 azllm:['sohaib-terraform-azure-llm',0,'2026','Azure OpenAI deployments from YAML, with a Python pipeline for quota discovery, capacity weighting and tfvars generation.'],
 genai:['terraform-azure-genai-infrastructure',0,'2026','A full GenAI estate: OpenAI accounts, AI Search with semantic search, APIM gateway, Container Apps behind it.'],
 vertex:['gcp-vertexai-app',0,'2026','Vertex AI Vector Search indexes and endpoints, with Python scripts for embeddings, querying and validation.'],
 run:['terraform-gcp-cloudrun-module',0,'2025','Next.js on Cloud Run behind a global load balancer, with Cloud Armor DDoS protection and rate limiting.'],
 rbac:['terraform-azure-rbac-module',0,'2025','Entra ID groups and scoped role assignments, so permissions live in a reviewable diff.'],
 ecs:['terraform-aws-ecs-webapp',0,'2025','Flask on ECS Fargate with VPC, ALB, Route 53 and a health endpoint wired to the ECS check.']
};
const row=k=>{const[n,l,y,d]=REPOS[k];return `<a class="rrow" href="https://github.com/sohaibsohail98/${n}" target="_blank" rel="noopener">
 <span class="rn">${n}${l?'<span class="live">LIVE</span>':''}</span><span class="rd">${d}</span>
 <span class="ry">${y}</span><span class="ar" aria-hidden="true">↗</span></a>`};
/* Deployed demos first: a working URL is the strongest single signal on the page. */
const LIVEROWS=[
 ['SRE investigation agent','https://sre-agent-sohaibsohail.workers.dev','Five tools on Bedrock AgentCore, streaming its tool calls over SSE while it works out why a service is degraded.'],
 ['MCP context inspector','https://mcp-inspector.sohaibsohail.workers.dev','Connect an MCP client and see exactly what entered the context window, block by block, with measured token counts.']
].map(([n,u,d])=>`<a class="rrow" href="${u}" target="_blank" rel="noopener">
 <span class="rn">${n}<span class="live">TRY IT</span></span><span class="rd">${d}</span>
 <span class="ry">live</span><span class="ar" aria-hidden="true">↗</span></a>`).join('');
$('#worklist').innerHTML=LIVEROWS+['sre','mci','halal','azllm','genai','vertex','run','rbac','ecs'].map(row).join('')
 +`<a class="rrow" href="https://github.com/sohaibsohail98?tab=repositories" target="_blank" rel="noopener">
   <span class="rn" style="color:var(--mid)">+ 36 more</span>
   <span class="rd">The learning archive, 2019 to 2021: OOP fundamentals, TDD with pytest, Flask MVC, Vagrant builds. Left public deliberately.</span>
   <span class="ry">2019–21</span><span class="ar" aria-hidden="true">↗</span></a>`;

