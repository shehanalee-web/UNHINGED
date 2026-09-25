# UNHINGED

Ask the Council. Regret nothing.

UNHINGED is a free decision toy. You ask a question, pick a council, and get a verdict. Nothing is sent to a server, and the same question plus the same council always produces the same result.

## Councils

- Chaos — The Chaos Council
- Adults — The Responsible Adults
- Corporate — The Corporate Board
- Friends — The Feral Best Friends
- Stoic — The Stoic Senate

## How it works

The decision engine runs locally in the browser and is deterministic. Convening a council writes a shareable verdict URL (`/?c=&q=`). Opening that URL shows the same verdict again.

## Stack

Next.js 16, React 19, TypeScript, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```
