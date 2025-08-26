// import {generateText} from "ai";
// import {google} from "@ai-sdk/google";
// import { getRandomInterviewCover } from "@/lib/utils";
// import { db } from "@/firebase/admin";

// export async function GET() {
//   return new Response(JSON.stringify({ success: true, data: "THANK YOU!" }), {
//     status: 200,
//     headers: { "Content-Type": "application/json" },
//   });
// }

// export async function POST(request: Request) {
//   const { type, role, level, techstack, amount, usedid } = await request.json();
// try {
  
//   const {text : questions} = await generateText({
//     model: google('gemini-2.0-flash-001'),
//     prompt: `Prepare questions for a job interview.
//         The job role is ${role}.
//         The job experience level is ${level}.
//         The tech stack used in the job is: ${techstack}.
//         The focus between behavioural and technical questions should lean towards: ${type}.
//         The amount of questions required is: ${amount}.
//         Please return only the questions, without any additional text.
//         The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
//         Return the questions formatted like this:
//         ["Question 1", "Question 2", "Question 3"]
        
//         Thank you! <3
//     `,
//   });

//   const interview = {
//     role, type, level, techstack: techstack.split(','),
//     questions: JSON.parse(questions),
//     userId : usedid,
//     finalized: true,
//     coverImage: getRandomInterviewCover(),
//     createdAt: new Date().toISOString()
//   }

//   await db.collection('interviews').add(interview);
//   return Response.json({success:true}, {status:200})


// } catch (e) {
//   console.log(e);
//   return new Response(
//     JSON.stringify({ success: false, error: e }),
//     { status: 500 }
//   );
// }
// }


import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { getRandomInterviewCover } from "@/lib/utils";
import { db } from "@/firebase/admin";

export async function GET() {
  return new Response(
    JSON.stringify({ success: true, data: "THANK YOU!" }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function POST(request: Request) {
  const { type, role, level, techstack, amount, userid } = await request.json();

  try {
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techstack}.
        The focus between behavioural and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]
        
        Thank you! <3
    `,
    });

    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(questions);
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid question format" }),
        { status: 500 }
      );
    }

    const interview = {
      role,
      type,
      level,
      techstack: techstack.split(","),
      questions: parsedQuestions,
      userId: userid,
      finalized: true,
      coverImage: getRandomInterviewCover(),
      createdAt: new Date().toISOString(),
    };

    await db.collection("interviews").add(interview);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (e: any) {
    console.error(e);
    return new Response(
      JSON.stringify({ success: false, error: e.message || String(e) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}