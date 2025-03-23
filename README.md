# Kids Trivia Adventure

A fun and educational trivia game for kids aged 8-12, inspired by Trivia Crack 2. This game features:

- Six engaging categories: Science & Nature, History & Geography, Math & Logic, Arts & Literature, Fun Facts, and Sports & Games
- Kid-friendly questions with explanations
- Beautiful, animated interface
- Score tracking and achievements
- No ads or in-app purchases

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory and add any required environment variables.

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to start playing!

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Firebase (optional for user progress saving)

## Project Structure

```
src/
├── app/
│   ├── page.tsx           # Home page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── GameWheel.tsx      # Main game wheel component
│   └── QuestionCard.tsx   # Question display component
└── lib/
    ├── types.ts           # TypeScript types
    └── sampleQuestions.ts # Question database
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.