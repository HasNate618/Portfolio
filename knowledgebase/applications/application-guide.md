# APPLICATION WRITING GUIDE

## Best Practices for Using This Knowledge Base

### 1. Retrieve Only Relevant Evidence
- Don't dump everything into an application
- Select 2-4 projects that best match the role
- Choose experiences that demonstrate relevant skills
- Use specific metrics and outcomes when possible

### 2. Tailor Your Narrative
- Frame projects differently for different roles
- Emphasize different aspects based on job requirements
- Connect your experience to the company's needs
- Show, don't just tell

### 3. Be Specific and Truthful
- Use exact technologies and outcomes from project files
- Don't claim expertise you can't demonstrate
- Be honest about your role in team projects
- Quantify impact when possible

### 4. Structure Your Applications

**For Technical Roles:**
- Lead with technical depth
- Describe architecture and implementation details
- Mention specific technologies and why you chose them
- Include challenges overcome and lessons learned

**For Product/Engineering Roles:**
- Lead with problem and impact
- Describe user needs and how you addressed them
- Include metrics and outcomes
- Show collaboration and decision-making

**For Research/AI Roles:**
- Lead with methodology and innovation
- Describe experiments and results
- Include technical depth on models and approaches
- Show understanding of the field

### 5. Common Application Questions

**"Tell us about a challenging project"**
- Choose a project with clear obstacles
- Describe the challenge specifically
- Explain your approach to solving it
- Share the outcome and what you learned
- Good options: AgenticArmy, Auralis, FLEXFIRE-X, Cyberdeck

**"Describe your technical skills"**
- Use the skills section from profile.md
- Connect skills to specific projects
- Show progression and depth
- Be honest about proficiency levels

**"Why are you interested in this role/company?"**
- Connect your themes to company mission
- Reference specific company projects or values
- Show how your experience aligns
- Demonstrate genuine interest

**"Tell us about a time you worked in a team"**
- Choose hackathon projects (most are team-based)
- Describe your specific role
- Mention collaboration challenges
- Share outcomes and team dynamics

**"Describe your approach to problem-solving"**
- Use examples from projects
- Show systematic thinking
- Include iteration and learning
- Demonstrate resilience

### 6. Project Selection by Role Type

**AI/ML Engineer:**
- Local AI Platform (infrastructure)
- AgenticArmy (orchestration)
- Gaming & Mental Health Analyzer (classical ML)
- Auralis (multimodal AI)
- VitalSign (computer vision)

**Full-Stack Developer:**
- Local AI Platform (dockerized stack)
- Auralis (Next.js + FastAPI)
- CareBridge (React + FastAPI + Supabase)
- NowAndThen (React Native + Node.js)
- Stupid Spotify (Next.js + APIs)

**Mobile Developer:**
- Animarker (Android + TensorFlow)
- SafeRoute (Android + Maps)
- Street Cleaner (Unity mobile)
- NowAndThen (React Native)

**Game Developer:**
- Street Cleaner (Unity mobile)
- Careerly (Unity + AI)
- Lumen (Unity + web integration)
- VR ODM Gear (Unity VR)
- Wasteland (Unity + hardware)

**Hardware/Embedded:**
- FLEXFIRE-X (EMG + mechanics)
- Cyberdeck (Linux + hardware)
- Wasteland (sensors + Unity)
- VR ODM Gear (Arduino + VR)
- Object-Love-Interface (IoT)

**Infrastructure/DevOps:**
- Local AI Platform (Docker + Linux)
- Cyberdeck (Linux systems)
- AgenticArmy (backend architecture)
- TeraGo internship (automation)

**Developer Tools:**
- Glyph (desktop productivity)
- AgenticArmy (VS Code extension)
- UWO Mealplan Calc (browser extension)

### 7. Strong Claims to Make

**Can confidently claim:**
- Experience building local-first AI systems
- Multi-agent orchestration and workflow design
- Linux system administration and self-hosting
- Docker containerization and deployment
- Hardware prototyping and embedded development
- Unity game development and VR/AR
- Rapid prototyping and hackathon execution
- Full-stack development with modern frameworks
- Mobile app development (Android + cross-platform)

**Should qualify:**
- "Experience with" rather than "expert in" for technologies used briefly
- "Familiar with" for technologies learned in projects
- Be specific about your role in team projects
- Don't claim production-scale experience from internships alone

### 8. Weaknesses to Address

**If asked about gaps:**
- Limited production-scale experience → Emphasize rapid learning and project diversity
- No formal AI/ML degree → Highlight self-taught skills and project evidence
- Limited open source contributions → Mention interest and willingness to contribute
- No FAANG experience → Emphasize breadth and hands-on learning

**Turn weaknesses into strengths:**
- "I haven't worked at a big company" → "I've had to wear many hats and understand the full stack"
- "I'm still in school" → "I bring fresh perspectives and cutting-edge knowledge"
- "My experience is mostly projects" → "I've built and shipped more varied projects than many professionals"

### 9. Follow-Up Questions to Prepare

**Technical:**
- "Walk me through the architecture of [project]"
- "Why did you choose [technology] over [alternative]?"
- "How would you scale [project] to handle 10x users?"
- "What would you do differently if you rebuilt [project]?"

**Behavioral:**
- "Tell me about a time you disagreed with a teammate"
- "Describe a project that failed and what you learned"
- "How do you prioritize when working on multiple projects?"
- "What do you do when you get stuck on a problem?"

**Situational:**
- "How would you approach [specific problem at company]?"
- "What would you build if you had unlimited resources?"
- "How do you stay current with technology trends?"

### 10. Final Checklist Before Submitting

- [ ] Projects selected match role requirements
- [ ] Claims are supported by evidence in knowledge base
- [ ] No exaggeration or unsupported claims
- [ ] Specific technologies and outcomes mentioned
- [ ] Team projects clarify individual contribution
- [ ] Tone matches company culture
- [ ] No typos or grammatical errors
- [ ] Links work (if included)
- [ ] Contact information correct
- [ ] Resume and application consistent

---

## Recommended RAG Workflow

1. **Index Documents**
   - Split knowledge base into chunks by topic
   - Create embeddings for each chunk
   - Store in vector database

2. **Query Processing**
   - Extract key requirements from job description
   - Identify relevant themes and technologies
   - Formulate search queries

3. **Retrieval**
   - Retrieve top-k relevant chunks
   - Include profile, relevant projects, skills
   - Filter by theme and technology

4. **Generation**
   - Use retrieved chunks as context
   - Generate draft application
   - Ensure claims are supported by evidence

5. **Review**
   - Check for truthfulness
   - Verify technical accuracy
   - Ensure role alignment
   - Edit for tone and clarity

6. **Storage**
   - Save final application
   - Store job description and outcome
   - Update knowledge base if needed

---

*This guide should be used alongside the profile and project files to create tailored, truthful, and compelling applications.*
