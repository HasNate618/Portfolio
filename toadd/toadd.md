[vitalsign] VitalSign


Inspiration

Recognizing that many accessibility tools focus on word translation and miss emotional context, we built VitalSign to help Deaf and non-verbal users communicate more naturally in situations where interpreters aren't available, preserving both meaning and emotion.
What it does

VitalSign is a real-time web application that translates ASL gestures and facial expressions into natural, emotion-aware speech. Users sign in front of their webcam, and the system detects gestures, refines the text with AI, and converts it to expressive speech.
How we built it

Built with Next.js 15 and React 19, using MediaPipe for real-time hand tracking and gesture recognition , Cohere AI for text refinement into natural sentences, ElevenLabs API for emotion-aware text-to-speech, and face-api.js for emotion detection. All processing happens in the browser with server-side API routes for secure key management.
Challenges we ran into

Managing real-time performance while processing video, gesture recognition, emotion detection, and API calls simultaneously. Ensuring gesture recognition accuracy across different lighting and camera angles. Integrating multiple APIs (Cohere, ElevenLabs) with proper error handling and fallbacks. Balancing latency with quality in the translation pipeline.
Accomplishments that we're proud of

Built a complete end-to-end pipeline from sign detection to speech output, all within 24 hours. Implemented emotion-aware synthesis that adjusts voice tone based on detected emotions. Created a web-based solution requiring no special hardware, just a browser and webcam. Achieved real-time performance suitable for live conversations. Designed an intuitive UI with voice selection and volume controls.
What we learned

The importance of combining multiple AI technologies (computer vision, NLP, TTS) to create a cohesive solution. How to structure Next.js API routes for secure third-party API integration. Accessibility considerations beyond basic functionality—preserving emotional nuance matters. The challenges of real-time video processing and managing multiple async operations in React.
What's next for Vital Sign

Expand the gesture vocabulary to 50+ common ASL signs. Improve gesture recognition accuracy with better filtering and confidence thresholds. Add support for multi-word phrases and sentence construction. Integrate with video conferencing platforms (Zoom, Teams) for meeting accessibility. Add support for other sign languages beyond ASL. Implement user customization for gesture sensitivity and personal voice preferences.
Built With

    cohere
    elevenlabs
    faceapi
    mediapipe
    next
    vercel

[nowandthen] NowAndThen


Inspiration

Places hold memories, but they usually vanish the moment you leave. We wanted to give everyday locations a lasting sense of self by letting people leave small traces behind, building a place's character over time.
What it does

NowAndThen is a map that reveals nearby memories. You can leave a comment, photo, or video tied to your exact location, browse what others have left around you, and replay trails by tracing someone’s posts through space and time. You can also add friends, react with likes, and view an AI summary that captures the personality of a location.
How we built it

We built a React Native app with an interactive map, live location tracking, and custom UI elements. For the backend, we used Node and Express with MongoDB to store comments and query them by distance so the app can fetch nearby posts quickly.
Challenges we ran into

We dealt with mobile networking issues, merge conflicts during fast iteration, mobile dev debugging, and tuning location updates to feel smooth.
Accomplishments that we're proud of

Identity is an abstract theme with many different interpretations. We’re proud to have planned and developed a clear, concrete concept, and translated it into a product that truly demonstrates it. We shipped a polished map experience with radius controlled comment discovery, friends, likes, AI analysis, and a trail animation that turns comments into stories to follow.
What we learned

Mobile dev, working with different operating systems (iOS + Android), Android Studio, real-time location data, database management, video editing, and so much more!
What's next for NowAndThen

Better discovery filters (time, vibe, popularity) and lightweight moderation to keep the map safe and meaningful.
Built With

    express.js
    google-maps
    mongodb
    react-native
