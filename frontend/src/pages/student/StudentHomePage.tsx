import { CampusScene, StepArt } from "../../components/illustrations/Illustrations";
import { ButtonLink, Card, Icon, Pill, ProgressBar, StatCard } from "../../components/ui";
import { ROUTES } from "../../config/routes";
import { accommodationStages, currentStageIndex, howItWorks, studentOverview, surveyStatus } from "../../data/student";
import { usePageTitle } from "../../hooks/usePageTitle";
import { usePortalInfo } from "../../hooks/usePortalInfo";
import { cx } from "../../utils/cx";

export default function StudentHomePage() {
  const overview = studentOverview;
  const { announcements, keyDates } = usePortalInfo("student");
  usePageTitle("Home");

  return (
    <>
      {/* Banner: who the portal is for and what it does */}
      <section className="relative overflow-hidden rounded-card bg-surface-raised">
        <div className="grid items-center gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-10">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <p className="eyebrow">KBTU student housing · Academic year {overview.academicYear}</p>
              <Pill tone="warning" caps dashed>
                Sample data
              </Pill>
            </div>
            <h1 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              {overview.greeting}, {overview.firstName}!
            </h1>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text/80">
              UniDorm is where you apply for a room in the {overview.building} dormitory, find a roommate with
              similar habits and sign your roommate agreement.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink to={ROUTES.student.accommodation} size="lg">
                Choose room type
                <Icon name="arrowRight" size={18} />
              </ButtonLink>
              <ButtonLink to={ROUTES.student.roommateMatching} variant="secondary" size="lg">
                How matching works
              </ButtonLink>
            </div>
          </div>
          <CampusScene className="w-full max-w-md justify-self-center" />
        </div>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <StatCard
          label="Accommodation application"
          value={overview.building}
          footer={<Pill tone={overview.applicationStatus.tone}>{overview.applicationStatus.label}</Pill>}
        />
        <StatCard
          label="Room type"
          value={overview.roomType.value}
          footer={<Pill tone={overview.roomType.status.tone}>{overview.roomType.status.label}</Pill>}
        />
        <StatCard
          label="Roommate agreement"
          value={overview.agreement.value}
          footer={<Pill tone={overview.agreement.status.tone}>{overview.agreement.status.label}</Pill>}
        />
      </div>

      <Card className="mt-6" padding="lg" title="How it works" description="Four steps from your application to your room.">
        <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {accommodationStages.map((stage, index) => {
            const step = howItWorks[index];
            const current = index === currentStageIndex;
            return (
              <li
                key={stage.id}
                aria-current={current ? "step" : undefined}
                className={cx(
                  "flex flex-col rounded-card p-4",
                  current ? "bg-highlight-soft ring-2 ring-highlight" : "bg-surface-sunken",
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-20 place-items-center rounded-full bg-surface">
                    <StepArt step={step.art} className="size-16" />
                  </span>
                  <span className="font-display text-sm font-semibold text-muted">Step {index + 1}</span>
                </div>
                <p className="mt-3 font-display font-semibold">{stage.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{step.text}</p>
                {current && <p className="mt-3 text-xs font-semibold text-warning">You are here</p>}
              </li>
            );
          })}
        </ol>
        <ProgressBar
          className="mt-6"
          label="Habits survey"
          valueLabel={`${surveyStatus.answered} of ${surveyStatus.total} questions`}
          value={surveyStatus.answered}
          max={surveyStatus.total}
        />
      </Card>

      <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <Card title="Announcements" description="News from the Housing Office.">
          <ul className="divide-y divide-border">
            {announcements.map((item) => (
              <li key={item.id} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                <span className="mt-1.5 size-2.5 shrink-0 rounded-full bg-highlight" aria-hidden="true" />
                <div className="min-w-0">
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{item.body}</p>
                  <p className="mt-1.5 text-xs font-semibold text-accent">{item.period}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Key dates" description="The accommodation year at a glance.">
          <ol className="relative flex flex-col gap-4 border-l-2 border-border pl-5">
            {keyDates.map((date) => (
              <li key={date.id} className="relative">
                <span
                  className="absolute -left-[1.6rem] top-1 grid size-4 place-items-center rounded-full bg-surface ring-2 ring-accent"
                  aria-hidden="true"
                />
                <p className="text-xs font-semibold text-accent">{date.when}</p>
                <p className="text-sm font-semibold">{date.title}</p>
                <p className="text-sm text-muted">{date.note}</p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}
