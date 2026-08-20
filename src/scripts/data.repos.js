const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rd=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* ── repos ── */
const REPOS={
 sre:['sre-investigation-agent','2026','https://sre-agent-sohaibsohail.workers.dev',
   'Incident agent with five SRE tools on Bedrock AgentCore. Tool calls stream to the browser as it investigates, and eight eval scenarios run live against Bedrock on every push before deploy. The public demo replays recorded investigations through the same code path.'],
 mci:['mcp-context-inspector','2026','https://mcp-inspector.sohaibsohail.workers.dev',
   'A drop-in MCP server and metrics recorder, extracted from the agent above. Eight tools over session cost and tokens, plus a Context Window Explorer showing what actually reached the model. Run from source; any MCP client can connect.'],
 halal:['halal-mortgage-calculator','2026','https://halalmortgagecalculator.org.uk',
   'Islamic Home Purchase Plans compared against conventional mortgages. Break-even, stamp duty, joint affordability. No tracking, works offline.'],
 azllm:['sohaib-terraform-azure-llm','2026',null,
   'Azure OpenAI deployments from YAML, with a Python pipeline for quota discovery, capacity weighting and tfvars generation.'],
 genai:['terraform-azure-genai-infrastructure','2026',null,
   'A full GenAI estate: OpenAI accounts, AI Search with semantic search, APIM gateway, Container Apps behind it.'],
 vertex:['gcp-vertexai-app','2026',null,
   'Vertex AI Vector Search indexes and endpoints, with Python scripts for embeddings, querying and validation.'],
 run:['terraform-gcp-cloudrun-module','2025',null,
   'Next.js on Cloud Run behind a global load balancer, with Cloud Armor DDoS protection and rate limiting.'],
 rbac:['terraform-azure-rbac-module','2025',null,
   'Entra ID groups and scoped role assignments, so permissions live in a reviewable diff.'],
 ecs:['terraform-aws-ecs-webapp','2025',null,
   'Flask on ECS Fargate with VPC, ALB, Route 53 and a health endpoint wired to the ECS check.']
};

/* One row per project. Where something is deployed, the live demo and the source
   sit side by side rather than as two separate entries in the list. A row is a
   div rather than an anchor because it now holds more than one link. */
const row=k=>{
  const [n,y,live,d]=REPOS[k];
  const gh=`https://github.com/sohaibsohail98/${n}`;
  return `<div class="rrow">
   <span class="rn"><a href="${live||gh}" target="_blank" rel="noopener">${n}</a>${live?'<span class="live">LIVE</span>':''}</span>
   <span class="rd">${d}</span>
   <span class="rlinks">${live?`<a href="${live}" target="_blank" rel="noopener">demo &#8599;</a>`:''}<a href="${gh}" target="_blank" rel="noopener">source &#8599;</a></span>
   <span class="ry">${y}</span></div>`;
};

$('#worklist').innerHTML=['sre','mci','halal','azllm','genai','vertex','run','rbac','ecs'].map(row).join('')
 +`<div class="rrow">
   <span class="rn" style="color:var(--mid)">+ 36 more</span>
   <span class="rd">The learning archive, 2019 to 2021: OOP fundamentals, TDD with pytest, Flask MVC, Vagrant builds. Left public deliberately.</span>
   <span class="rlinks"><a href="https://github.com/sohaibsohail98?tab=repositories" target="_blank" rel="noopener">browse &#8599;</a></span>
   <span class="ry">2019&ndash;21</span></div>`;


