"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { Photo } from "@/components/ui/Photo";
import { PillButton } from "@/components/ui/PillButton";
import { FadeUp, ImageReveal } from "@/components/ui/Reveal";

type Member = (typeof site.team.members)[number];

function MemberCard({ member }: { member: Member }) {
  const [open, setOpen] = useState(false);
  const [intro, ...rest] = member.bio;
  const bioId = `bio-${member.name.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <article className="grid gap-6 rounded-img bg-white p-6 sm:grid-cols-[200px_1fr] sm:p-7">
      <ImageReveal className="aspect-[4/5] rounded-img sm:aspect-[200/250]">
        <Photo image={member.image} width={200} height={250} />
      </ImageReveal>
      <div className="flex flex-col">
        <h3 className="text-[22px] leading-[1.2] font-medium tracking-[-0.02em]">{member.name}</h3>
        <p className="mt-2 text-xs tracking-[0.08em] text-body uppercase">{member.credentials}</p>
        <div id={bioId} className="mt-5 space-y-3 text-sm leading-[1.65] text-body">
          <p>{intro}</p>
          {open && rest.map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        </div>
        {rest.length > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={bioId}
            className="group mt-5 inline-flex items-center gap-1.5 self-start text-[13px] text-ink"
          >
            <span className="border-b border-ink pb-[3px]">{open ? "Show less" : "Read full bio"}</span>
            <Plus
              aria-hidden
              size={13}
              strokeWidth={1.75}
              className={`-mt-[3px] transition-transform duration-300 ${open ? "rotate-45" : ""}`}
            />
          </button>
        )}
      </div>
    </article>
  );
}

export function Team() {
  const { team, bookCta } = site;

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="shell shell-pad rounded-[20px] bg-sky py-14 md:rounded-panel md:py-20 lg:py-24"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <FadeUp>
          <h2 id="team-title" className="h2">
            {team.title}
          </h2>
          <p className="mt-3 max-w-[380px] text-[13px] leading-[1.6] text-ink/65">{team.text}</p>
        </FadeUp>
        <FadeUp step={1}>
          <PillButton href={bookCta.href}>{bookCta.label}</PillButton>
        </FadeUp>
      </div>

      <div className="mt-10 grid items-start gap-5 lg:mt-[50px] lg:grid-cols-2">
        {team.members.map((member) => (
          <MemberCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
