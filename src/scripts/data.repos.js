const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const rd=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

/* ── repos ── */
const REPOS={
 sre:['sre-investigation-agent','2026','https://sre-agent.sohaibsohail.workers.dev','previews/sre-agent.jpg',
   ['Python','Bedrock AgentCore','Terraform'],
   'Incident agent with five SRE tools, streaming each call as it investigates. 8/8 eval scenarios passing.'],
 mci:['mcp-context-inspector','2026','https://mcp-inspector.sohaibsohail.workers.dev','previews/mcp-inspector.jpg',
   ['Python','MCP','DynamoDB'],
   'Eight MCP tools over session cost and tokens, plus a Context Window Explorer any client can connect to.'],
 halal:['halal-mortgage-calculator','2026','https://halalmortgagecalculator.org.uk','previews/halal.jpg',
   ['HTML','JS'],
   'Islamic Home Purchase Plans compared against conventional mortgages. Free, no tracking, works offline.'],
 azllm:['sohaib-terraform-azure-llm','2026',null,'previews/azllm.jpg',
   ['Terraform','Python','Azure'],
   'Azure OpenAI deployments from YAML, with a Python pipeline for quota discovery and capacity weighting.'],
 vertex:['gcp-vertexai-app','2026',null,'previews/vertex.jpg',
   ['Terraform','Python','GCP'],
   'Vertex AI Vector Search indexes and endpoints, with Python scripts for embeddings and validation.'],
 run:['terraform-gcp-cloudrun-module','2025',null,'previews/run.jpg',
   ['Terraform','Cloud Armor'],
   'Next.js on Cloud Run behind a global load balancer, with Cloud Armor and rate limiting.'],
 ecs:['terraform-aws-ecs-webapp','2025',null,'previews/ecs.jpg',
   ['Terraform','ECS Fargate'],
   'Flask on ECS Fargate with VPC, ALB, Route 53 and a health endpoint wired to the ECS check.'],
 genai:['terraform-azure-genai-infrastructure','2026',null,null,['Terraform','APIM'],
   'A full GenAI estate: OpenAI accounts, AI Search, APIM gateway, Container Apps behind it.'],
 rbac:['terraform-azure-rbac-module','2025',null,null,['Terraform','Entra ID'],
   'Entra ID groups and scoped role assignments, so permissions live in a reviewable diff.']
};
const gh=n=>`https://github.com/sohaibsohail98/${n}`;

const card=(k,big)=>{const[n,y,live,img,tech,d]=REPOS[k];return `<article class="pcard${big?' big':''}">
 <a class="pshot" href="${live||gh(n)}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">
   <img src="${img}" alt="" width="760" height="300" loading="lazy" decoding="async"></a>
 <div class="pbody">
  <h3><a href="${live||gh(n)}" target="_blank" rel="noopener">${n}</a>${live?'<span class="live">LIVE</span>':''}</h3>
  <p>${d}</p>
  <span class="tech">${tech.map(x=>`<span>${x}</span>`).join('')}</span>
  <span class="plinks">${live?`<a href="${live}" target="_blank" rel="noopener">Open demo &#8599;</a>`:''}<a href="${gh(n)}" target="_blank" rel="noopener">Source &#8599;</a><span class="py">${y}</span></span>
 </div></article>`};

const row=k=>{const[n,y,live,img,tech,d]=REPOS[k];return `<div class="rrow">
   <span class="rn"><a href="${gh(n)}" target="_blank" rel="noopener">${n}</a></span>
   <span class="rd">${d}</span>
   <span class="rlinks"><a href="${gh(n)}" target="_blank" rel="noopener">source &#8599;</a></span>
   <span class="ry">${y}</span></div>`};

$('#featured').innerHTML=['sre','mci'].map(k=>card(k,true)).join('');
$('#grid').innerHTML=['halal','azllm','vertex','run','ecs'].map(k=>card(k,false)).join('');
$('#worklist').innerHTML=['genai','rbac'].map(row).join('')
 +`<div class="rrow">
   <span class="rn" style="color:var(--mid)">+ 36 more</span>
   <span class="rd">The learning archive, 2019 to 2021. Left public on purpose.</span>
   <span class="rlinks"><a href="https://github.com/sohaibsohail98?tab=repositories" target="_blank" rel="noopener">browse &#8599;</a></span>
   <span class="ry">2019&ndash;21</span></div>`;
