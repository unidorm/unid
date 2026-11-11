import { CategoryDoodle, RoommatesScene } from "../../components/illustrations/Illustrations";
import { Button, Card, Pill, ProgressBar } from "../../components/ui";
import { studentOverview, surveyCategories, surveyDataUse, surveyStatus } from "../../data/student";
import { usePageTitle } from "../../hooks/usePageTitle";

/** One line about each survey area, so students know what they will be asked. */
const AREA_HINTS: Record<(typeof surveyCategories)[number]["id"], string> = {
  sleep: "When you go to bed and wake up",
  noise: "Music, calls and quiet hours",
  cleanliness: "How tidy you keep shared space",
  visitors: "Guests and how much notice you want",
  study: "Where and when you study",
};

export default function RoommateMatchingPage() {
  usePageTitle("Roommate matching");

  return (
    <>
      <section className="overflow-hidden rounded-card bg-surface-raised">
        <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">Roommate matching · new in UniDorm</p>
              <Pill tone="warning" caps dashed>
                Sample data
              </Pill>
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Find a roommate who lives like you
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text/80">
              {surveyStatus.total} questions, no right or wrong answers. Answer how you really live, not how you
              think you should: honest answers give you a better match.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <Button size="lg" disabled>
                Start survey
              </Button>
              <p className="text-sm text-muted">
                About {studentOverview.surveyMinutes} minutes · The survey opens in the next stage.
              </p>
            </div>
          </div>
          <RoommatesScene className="w-full max-w-sm justify-self-center" />
        </div>
      </section>

      <h2 className="mb-4 mt-8 font-display text-xl font-semibold">What the survey asks about</h2>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" aria-label="Survey areas and their weight">
        {surveyCategories.map((category) => (
          <li key={category.id} className="flex flex-col rounded-card bg-surface p-5">
            <span className="grid size-14 place-items-center rounded-full bg-surface-raised">
              <CategoryDoodle category={category.id} className="size-10" />
            </span>
            <p className="mt-3 font-display font-semibold">{category.label}</p>
            <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{AREA_HINTS[category.id]}</p>
            <p className="mt-3 text-xs text-muted">{category.questions} questions</p>
            <ProgressBar className="mt-2" label="Weight" valueLabel={`${category.weight}%`} value={category.weight} max={25} />
          </li>
        ))}
      </ul>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card title="How your answers are used">
          <ul className="flex flex-col gap-3">
            {surveyDataUse.map((line) => (
              <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card
          title="Survey status"
          actions={<Pill tone="neutral">{surveyStatus.label}</Pill>}
          description="Your progress through the five survey areas."
        >
          <ProgressBar
            label="Overall"
            valueLabel={`${surveyStatus.answered} of ${surveyStatus.total} questions`}
            value={surveyStatus.answered}
            max={surveyStatus.total}
          />
          <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
            {surveyCategories.map((category) => (
              <ProgressBar
                key={category.id}
                label={category.label}
                valueLabel={`${surveyStatus.answeredByCategory[category.id]} of ${category.questions}`}
                value={surveyStatus.answeredByCategory[category.id]}
                max={category.questions}
              />
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
