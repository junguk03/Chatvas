import { Framework } from '../types';

export function generatePrompt(userPrompt: string, framework: Framework): string {
  const frameworkInstructions = {
    react: `
- Use React 18+ with functional components and hooks
- Use Tailwind CSS for styling
- Export as default component
- Include proper TypeScript types if needed
`,
    vue: `
- Use Vue 3 Composition API
- Use Tailwind CSS for styling
- Use <script setup> syntax
- Export as default component
`,
    svelte: `
- Use Svelte 4+
- Use Tailwind CSS for styling
- Export as default component
`,
  };

  return `You are an expert UI/UX developer. Generate complete, production-ready code based on the user's request.

**User Request:**
${userPrompt}

**Framework:** ${framework.toUpperCase()}

**Requirements:**
${frameworkInstructions[framework]}
- Create a complete, self-contained HTML file
- Include all necessary inline styles using Tailwind CSS classes
- Make it responsive and mobile-friendly
- Use modern, clean design principles
- Include proper semantic HTML
- Add hover effects and transitions where appropriate
- The code should be copy-paste ready and work immediately

**Output Format:**
Return ONLY the complete HTML code wrapped in triple backticks with the language identifier.
Do NOT include any explanations or comments outside the code block.

Example format:
\`\`\`html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated UI</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Your generated code here -->
</body>
</html>
\`\`\`

Now generate the code:`;
}

export function refinePrompt(
  currentCode: string,
  userRefinement: string,
  conversationHistory: string
): string {
  return `You are an expert UI/UX developer. Modify the existing code based on the user's refinement request.

**Conversation History:**
${conversationHistory}

**Current Code:**
\`\`\`html
${currentCode}
\`\`\`

**User's Refinement Request:**
${userRefinement}

**Requirements:**
- Keep the existing structure and functionality
- Only modify what the user requested
- Maintain all existing styles that aren't being changed
- Ensure the code remains self-contained and production-ready
- Use Tailwind CSS for any new styles
- Preserve responsiveness and mobile-friendliness

**Output Format:**
Return ONLY the complete modified HTML code wrapped in triple backticks.
Do NOT include explanations outside the code block.

\`\`\`html
<!DOCTYPE html>
<!-- Modified code here -->
\`\`\`

Now generate the refined code:`;
}
