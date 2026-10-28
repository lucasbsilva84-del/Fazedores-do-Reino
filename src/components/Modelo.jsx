import { TiArrowBack, TiLocationArrow } from "react-icons/ti";
import { church } from "../config";
import Button from "./Button";

const pending = (label) => `${label}: a confirmar`;

const leadershipItems = church.leaders.length
  ? church.leaders.map((person, index) => ({
      id: `leader-${index}`,
      title: person.name || "Nome a confirmar",
      description:
        person.bio || "Apresentação pendente de confirmação pela igreja.",
      image: person.photo || church.logo,
      imagePending: !person.photo,
      fields: [
        `Função: ${person.role || "a confirmar"}`,
        ...(!person.name ? [pending("Nome")] : []),
      ],
    }))
  : [
      {
        id: "leadership-pending",
        title: "Liderança",
        description:
          "Nomes e apresentações da liderança e dos pastores serão publicados após confirmação.",
        image: church.logo,
        imagePending: true,
        fields: [pending("Nome"), pending("Função"), pending("Apresentação")],
      },
    ];

const agendaItems = church.events.length
  ? church.events.map((event, index) => ({
      id: `event-${index}`,
      title: event.title || "Título a confirmar",
      description:
        event.description || "Descrição do encontro pendente de confirmação.",
      image: event.image || church.photos.events || church.logo,
      imagePending: !(event.image || church.photos.events),
      fields: [
        `Data e horário: ${event.date || "a confirmar"}`,
        `Local: ${event.location || "a confirmar"}`,
        ...(!event.title ? [pending("Título")] : []),
      ],
    }))
  : [
      {
        id: "agenda-pending",
        title: "Agenda",
        description: "Datas e horários dos encontros em confirmação.",
        image: church.logo,
        imagePending: true,
        fields: [pending("Encontro"), pending("Data e horário"), pending("Local")],
      },
    ];

const cellItems = church.cells.length
  ? church.cells.map((cell, index) => ({
      id: `cell-${index}`,
      title: cell.name || "Nome da célula a confirmar",
      description:
        cell.description || "Descrição desta célula ainda não cadastrada.",
      image: cell.image || church.photos.community || church.logo,
      imagePending: !(cell.image || church.photos.community),
      fields: [
        `Local: ${cell.location || "a confirmar"}`,
        `Horário: ${cell.schedule || "a confirmar"}`,
        ...(!cell.name ? [pending("Nome")] : []),
      ],
    }))
  : [
      {
        id: "cells-pending",
        title: "Células",
        description: "Locais e horários das células em confirmação.",
        image: church.logo,
        imagePending: true,
        fields: [pending("Nome"), pending("Local"), pending("Horário")],
      },
    ];

const groups = [
  { id: "lideranca", title: "Liderança", items: leadershipItems },
  { id: "agenda", title: "Agenda", items: agendaItems },
  { id: "celulas", title: "Células", items: cellItems },
];

function ModeloCard({ item, groupTitle }) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/20 bg-white/[0.03]">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-violet-950 to-black">
        <img
          src={item.image}
          alt={
            item.imagePending
              ? `Marca Fazedores do Reino; imagem de ${groupTitle.toLowerCase()} pendente`
              : `${groupTitle}: ${item.title}`
          }
          className={`size-full ${item.imagePending ? "object-contain p-10" : "object-cover"}`}
        />
        {item.imagePending && (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/80 px-3 py-1 font-general text-[10px] uppercase text-blue-50">
            Imagem oficial pendente
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="bento-title text-3xl">{item.title}</h3>
        <p className="mt-3 font-circular-web text-sm text-blue-50/80">
          {item.description}
        </p>
        <ul className="mt-5 space-y-2 border-t border-white/15 pt-4 font-circular-web text-sm text-blue-50/60">
          {item.fields.map((field) => (
            <li key={field}>{field}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Modelo() {
  return (
    <section className="page-enter min-h-screen bg-black px-5 pb-24 pt-32 text-blue-50 md:px-10 md:pt-40">
      <div className="container mx-auto">
        <Button
          title="Voltar"
          leftIcon={<TiArrowBack />}
          href="/#informacoes"
          containerClass="mb-12 flex items-center justify-center gap-2 bg-yellow-300"
        />
        <p className="font-general text-xs uppercase text-blue-50/60">
          Fazedores do Reino · Informações
        </p>
        <h1 className="hero-heading my-6 text-5xl sm:text-7xl md:text-9xl">
          Modelo
        </h1>
        <p className="mb-16 max-w-2xl font-circular-web text-base text-blue-50/70 md:text-lg">
          Conteúdo organizado a partir das informações disponíveis no projeto.
          Campos sem confirmação da igreja estão identificados como pendentes.
        </p>

        <div className="space-y-20">
          {groups.map((group) => (
            <section key={group.id} aria-labelledby={`${group.id}-title`}>
              <div className="mb-7 flex items-end justify-between border-b border-white/20 pb-4">
                <h2
                  id={`${group.id}-title`}
                  className="bento-title text-4xl md:text-6xl"
                >
                  {group.title}
                </h2>
                <TiLocationArrow
                  aria-hidden="true"
                  className="mb-2 text-2xl text-yellow-300"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((item) => (
                  <ModeloCard
                    key={item.id}
                    item={item}
                    groupTitle={group.title}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-white/20 pt-10">
          <Button
            title="Voltar"
            leftIcon={<TiArrowBack />}
            href="/#informacoes"
            containerClass="flex items-center justify-center gap-2 bg-yellow-300"
          />
        </div>
      </div>
    </section>
  );
}
