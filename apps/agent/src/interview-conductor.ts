import { INTERVIEWER_PERSONA, InterviewInstructions } from "@interview/shared";
import { StreamClient } from "@stream-io/node-sdk";

type OpenAIAgent = Awaited<ReturnType<StreamClient["video"]["connectOpenAi"]>>;

export class InterviewConductor {
  private interviewId: string;
  private openAIAgent: OpenAIAgent;
  private systemMessage: string;
  private interviewInstructions: InterviewInstructions;
  private interviewStartTime: number = 0;
  private currentPhaseIndex: number = 0;
  private interval: NodeJS.Timeout | null = null;

  constructor(
    interviewId: string,
    openAIAgent: OpenAIAgent,
    systemMessage: string,
    interviewInstructions: InterviewInstructions
  ) {
    this.interviewId = interviewId;
    this.openAIAgent = openAIAgent;
    this.systemMessage = systemMessage;
    this.interviewInstructions = interviewInstructions;

    this.setupTokenLogging();
  }

  private setupTokenLogging() {
    try {
      // Listen for usage events from OpenAI Realtime API
      // @ts-ignore - The client types might not fully expose the event emitter methods
      this.openAIAgent.on("response.done", (event: any) => {
        if (event.response?.usage) {
          this.logUsage(event.response.usage);
        }
      });
    } catch (error) {
      console.error("Failed to setup token logging:", error);
    }
  }

  private async logUsage(usage: any) {
    const WEB_APP_URL = process.env.WEB_APP_URL || "http://web:3000";
    const AGENT_SECRET = process.env.AGENT_SECRET || "secret";

    try {
      await fetch(`${WEB_APP_URL}/api/internal/token-usage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-secret": AGENT_SECRET,
        },
        body: JSON.stringify({
          interviewId: this.interviewId,
          usage: {
            prompt_tokens: usage.input_tokens,
            completion_tokens: usage.output_tokens,
            total_tokens: usage.total_tokens,
          },
        }),
      });
    } catch (error) {
      console.error(
        `Interview conductor for Interview ${this.interviewId}: Failed to log token usage`,
        error
      );
    }
  }

  public start() {
    console.log(
      "Starting interview conductor for interview ID: ",
      this.interviewId
    );
    this.interviewStartTime = Date.now();
    this.currentPhaseIndex = 0;

    this.interval = setInterval(async () => {
      await this.syncPhase();
    }, 60 * 1000); // Check every minute

    const interviewDurationMinutes = this.interviewInstructions.phases.reduce(
      (acc, phase) => acc + phase.durationMinutes,
      0
    );
    const safetyInterviewTimeout = (interviewDurationMinutes + 15) * 60 * 1000;

    setTimeout(() => this.stop(), safetyInterviewTimeout);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  private async syncPhase() {
    const elapsedMinutes = (Date.now() - this.interviewStartTime) / (1000 * 60);

    console.log(
      `Interview conductor for Interview ${this.interviewId}: ${elapsedMinutes.toFixed(2)}m elapsed, Phase ${
        this.currentPhaseIndex + 1
      }`
    );

    const newPhaseIndex = this.getNewPhaseIndex(elapsedMinutes);

    if (newPhaseIndex !== this.currentPhaseIndex) {
      const newPhase = this.interviewInstructions.phases[newPhaseIndex];

      console.log(
        `Interview conductor for Interview ${this.interviewId}: Switching from Phase ${this.currentPhaseIndex + 1} to Phase ${
          newPhaseIndex + 1
        }: ${newPhase.name}`
      );

      this.currentPhaseIndex = newPhaseIndex;

      // Only send update if there are instructions
      if (newPhase.instructions && newPhase.instructions.trim().length > 0) {
        try {
          await this.openAIAgent.updateSession({
            instructions:
              this.systemMessage + "\n\n" +
              "Remember you are only an interviewer and this is an interview. So you need to follow the interviewer persona and style guide: " +
              INTERVIEWER_PERSONA + "\n\n" +
              newPhase.instructions,
          });
        } catch (error) {
          console.error(
            `Interview conductor for Interview ${this.interviewId}: Error updating session in conductor:`,
            error
          );
        }
      }
    }
  }

  private getNewPhaseIndex(elapsedMinutes: number) {
    let phaseIndex = 0;
    let accumulatedTime = 0;

    for (let i = 0; i < this.interviewInstructions.phases.length; i++) {
      accumulatedTime += this.interviewInstructions.phases[i].durationMinutes;
      phaseIndex = i;

      if (elapsedMinutes < accumulatedTime) {
        break;
      }
    }

    return phaseIndex;
  }
}
