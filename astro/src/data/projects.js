const gh = n => `https://github.com/sohaibsohail98/${n}`;

// Featured: the two deployed flagships, with real depth facts pulled from the repos.
export const featured = [
  {
    name: 'sre-investigation-agent', year: '2026',
    live: 'https://sre-agent.sohaibsohail.workers.dev', repo: gh('sre-investigation-agent'),
    img: '/previews/sre-agent.jpg',
    tech: ['Python', 'Bedrock AgentCore', 'Terraform', 'SSE'],
    blurb: 'Incident agent with five SRE tools, streaming each call as it investigates.',
    facts: [
      '8/8 eval scenarios passing, scored on tool choice and on the facts reaching the answer',
      'One scenario has a false premise, to catch an agent inventing a cause rather than tracing the real dependency',
      'Deterministic mock infrastructure so eval scoring stays reproducible',
      'Public demo replays recorded runs, so anyone can try it at zero Bedrock cost',
    ],
  },
  {
    name: 'mcp-context-inspector', year: '2026',
    live: 'https://mcp-inspector.sohaibsohail.workers.dev', repo: gh('mcp-context-inspector'),
    img: '/previews/mcp-inspector.jpg',
    tech: ['Python', 'MCP', 'DynamoDB', 'Firestore', 'OTLP'],
    blurb: 'An MCP server that makes context window usage visible for any agent loop.',
    facts: [
      '300 automated tests, run on every push, no live cloud credentials needed',
      'Three storage backends behind one data-access layer: SQLite, DynamoDB, Firestore',
      'Ingests OTLP telemetry from Claude Code and Copilot, with a precision-biased redaction pass',
      'Full OAuth discovery (RFC 9728) plus Google sign-in, so any MCP client can connect',
    ],
  },
];

export const grid = [
  { name: 'halal-mortgage-calculator', year: '2026', live: 'https://halalmortgagecalculator.org.uk', repo: gh('halal-mortgage-calculator'), img: '/previews/halal.jpg', tech: ['HTML', 'JS'], blurb: 'Islamic Home Purchase Plans compared against conventional mortgages. Free, no tracking.' },
  { name: 'sohaib-terraform-azure-llm', year: '2026', repo: gh('sohaib-terraform-azure-llm'), img: '/previews/azllm.jpg', tech: ['Terraform', 'Python', 'Azure'], blurb: 'Azure OpenAI deployments from YAML, with a Python pipeline for quota discovery and capacity weighting.' },
  { name: 'gcp-vertexai-app', year: '2026', repo: gh('gcp-vertexai-app'), img: '/previews/vertex.jpg', tech: ['Terraform', 'Python', 'GCP'], blurb: 'Vertex AI Vector Search indexes and endpoints, with Python for embeddings and validation.' },
  { name: 'terraform-gcp-cloudrun-module', year: '2025', repo: gh('terraform-gcp-cloudrun-module'), img: '/previews/run.jpg', tech: ['Terraform', 'Cloud Armor'], blurb: 'Next.js on Cloud Run behind a global load balancer, with Cloud Armor and rate limiting.' },
  { name: 'terraform-aws-ecs-webapp', year: '2025', repo: gh('terraform-aws-ecs-webapp'), img: '/previews/ecs.jpg', tech: ['Terraform', 'ECS Fargate'], blurb: 'Flask on ECS Fargate with VPC, ALB, Route 53 and a health endpoint wired to the ECS check.' },
];

export const moreRepos = [
  { name: 'terraform-azure-genai-infrastructure', year: '2026', repo: gh('terraform-azure-genai-infrastructure'), tech: ['Terraform', 'APIM'], blurb: 'A full GenAI estate: OpenAI accounts, AI Search, APIM gateway, Container Apps behind it.' },
  { name: 'terraform-azure-rbac-module', year: '2025', repo: gh('terraform-azure-rbac-module'), tech: ['Terraform', 'Entra ID'], blurb: 'Entra ID groups and scoped role assignments, so permissions live in a reviewable diff.' },
];
