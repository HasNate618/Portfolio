# AgenticArmy

## Overview
Human-in-the-loop multi-agent coding workflow with a VS Code extension and FastAPI backend for planning, coordination, conflict analysis, and QA.

## Category
Agentic Coding, Full-Stack, AI Systems

## Status
Featured Portfolio Project

## Tech Stack
- TypeScript, JavaScript
- Python, FastAPI
- VS Code Extension API
- Moorcheh SDK (agent memory)
- RailTown (agent orchestration)
- Gemini API

## Description

AgenticArmy answers a practical question: how do you run multiple "coder agents" in parallel without them constantly conflicting, duplicating work, or losing context?

### Workflow

1. **Human provides goal** - High-level process, success metrics
2. **Planning agent runs** - Finds ways the goal can be implemented
3. **Human approves/denies plan** - If denied, return to step 2
4. **Task coordinator agent runs** - Splits tasks among agents
5. **Conflict analysis agent runs** - Assigns conflict scores based on likelihood of overwriting each other's work
6. **Coding agents run** - Tasks completed in isolated environments
7. **Merge agent runs** - Merges individual agent commits
8. **QA agent runs** - Tests code for functionality

### Key Features

- **Conflict Analysis**: Anticipates coding agent disagreements before they happen
- **Human-in-the-Loop**: Human intervention only for goal setting and plan approval
- **Similarity Scoring**: Calculates possibility of code overlap for reliable merges
- **State Machine**: Supports loopbacks (plan rejection, conflict risk too high, merge failure, QA failure)
- **Simulation Mode**: For local/UI testing without burning LLM quota

### Architecture

**VS Code Extension:**
- Collects goal and settings
- Calls backend endpoints
- Polls job status and renders logs + results

**FastAPI Backend:**
- Owns job lifecycle + HITL gates
- Runs phases: planner → coordinator → conflict analysis → coders → merge → QA
- Exposes stable API contract

### Job Statuses
`initializing → planning → awaiting_plan_approval → coordinating → analyzing_conflicts → coding → merging → verifying → review_ready → done|failed`

## Why It Matters
- Strong evidence for agentic workflow design
- Demonstrates understanding of coordination problems in multi-agent systems
- Shows ability to build developer tools
- Practical application of state machines and async orchestration

## Use Cases
- Automated code generation with oversight
- Parallel development tasks
- Code review automation
- Developer productivity tooling

## Links
- Devpost: https://devpost.com/software/agenticarmy
- GitHub: https://github.com/HasNate618/genai-genesis-2026

## Media
- Title Card
- Workflow Overview
- Multi-Agent View

---

*This project demonstrates my expertise in agentic AI systems and multi-agent orchestration. It's particularly relevant for roles involving AI tooling, developer productivity, or automation.*
