import type { Solucao } from "./solucoes";

/**
 * Traduções das soluções (inglês e espanhol).
 *
 * O `nome` de cada produto NÃO é traduzido: é a marca impressa na embalagem
 * (Agricultura Única, Saúde Única…). Todo o resto é.
 * As `pendencias` são notas internas em português e só aparecem na versão pt.
 *
 * Mantenha a MESMA ordem de itens das listas em solucoes.ts (benefícios,
 * composição, detalhes): a tradução é casada pela posição.
 */
export type TraducaoDeSolucao = Pick<Solucao, "resumo" | "chamada" | "descricao" | "beneficios"> & {
  composicao: string[];
  cientifico?: string[];
  detalhes?: { titulo: string; texto: string }[];
};

export const traducoesDasSolucoes: Record<"en" | "es", Record<string, TraducaoDeSolucao>> = {
  en: {
    "agricultura-unica": {
      resumo:
        "100% natural biotechnology suitable for any crop. It revitalizes the soil microbiota and reduces dependence on chemical inputs.",
      chamada: "The best alternative for agriculture",
      descricao:
        "Beneficial microorganisms that work in two ways: they compete directly with disease-causing pathogens and speed up the digestion of organic matter, releasing nutrients the plant absorbs more efficiently. The results show up in yield, in cost per hectare and in soil health season after season.",
      beneficios: [
        "Higher yields",
        "Lower overall cost",
        "Revitalizes the soil microbiota",
        "More uniform harvest",
        "Enriches the soil with beneficial substances",
        "Fewer diseases and pests",
        "Better plant resilience to water stress",
        "Environmentally friendly, with no environmental impact",
      ],
      composicao: ["Lactobacilli", "Saccharomyces", "Cyanobacteria", "Lentilactobacillus"],
      cientifico: ["Lacticaseibacillus paracasei", "Saccharomyces cerevisiae", "Cyanophyceae", "Lentilactobacillus parafarraginis"],
      detalhes: [
        {
          titulo: "First pathway — competition",
          texto:
            "The microorganisms in the formula are natural predators of disease-causing pathogens. They take up the space and food the pathogen would use, bringing its population down through direct competition.",
        },
        {
          titulo: "Second pathway — faster digestion",
          texto:
            "They break down soil compounds and release potassium, nitrogen, calcium, magnesium, iron, phosphorus and sulfur, along with antioxidants, amino acids, enzymes and vitamins A, B1, B12 and B5. They also increase soil permeability, which helps primary and secondary roots develop.",
        },
        {
          titulo: "Crops with proven use",
          texto:
            "Soybean, corn, sugarcane, citrus, fruits and vegetables, cereals and grains. The product can be used on any crop.",
        },
      ],
    },
    saneamento: {
      resumo:
        "High-performance bioremediator for treatment plants, rivers, ponds, septic tanks and grease traps.",
      chamada: "Revitalize. Restore.",
      descricao:
        "A high-performance bioremediator made of microorganisms in liquid form, focused on improving performance and partially or fully replacing chemical products. It is facultative, aerobic and anaerobic — so it can be used in any type of treatment plant, as well as in contaminated ponds and rivers, with no environmental harm.",
      beneficios: [
        "Works in any type of treatment plant",
        "Immediate action, no adaptation period",
        "Partially or fully replaces chemical products",
        "Eliminates offensive gases at the source",
        "No environmental harm — natural beneficial microorganisms",
        "Brings treated-water parameters into range",
      ],
      composicao: ["Photosynthetic bacteria", "Yeasts", "Lactic acid bacteria"],
      detalhes: [
        {
          titulo: "What it eliminates",
          texto:
            "Disease-causing pathogens and the direct producers of offensive gases — ammonia, hydrogen sulfide and methyl mercaptan, among others that pollute the air around the plant.",
        },
        {
          titulo: "It changes the process, not just the input",
          texto:
            "It leads neutral microorganisms to carry out the natural fermentation of the matter, which used to happen through oxidation due to excess oxygen. Organic matter is quickly turned into beneficial substances that help revitalize the receiving body of water.",
        },
        {
          titulo: "Where it is used",
          texto: "Industrial or municipal wastewater treatment plants; rivers, lakes and ponds; septic tanks and grease traps.",
        },
      ],
    },
    "saude-do-gado": {
      resumo:
        "A 100% natural line for beef and dairy cattle, built on commitment, sustainability and responsibility.",
      chamada: "Technology · Performance · Savings · Productivity",
      descricao:
        "The BIO-X line for cattle farming, presented in the company’s materials under the pillars of commitment, sustainability and responsibility.",
      beneficios: [],
      composicao: [],
    },
    "saude-unica-suinos": {
      resumo:
        "Applied to the environment and drinking water, it reduces pathogens, diarrhea and offensive gases on the farm.",
      chamada: "Less antibiotics, more well-being",
      descricao:
        "Pig health depends on the balance between feed, drinking water, facilities and management. BIO-X Saúde Única is a 100% natural technology that, applied to the environment and drinking water, reduces the level of pathogenic microorganisms that cause diseases such as diarrhea, and also cuts offensive gases — improving the well-being of both animals and workers.",
      beneficios: [
        "Significant reduction in diarrhea",
        "Less use of medicines and antibiotics",
        "Fewer runts",
        "Lower mortality",
        "Boosts the immune system",
        "Natural sanitizer for facilities",
        "Natural repellent",
        "Less use of chemical products",
      ],
      composicao: ["Yeast", "Lactobacillus", "Lactobacillus", "Lactobacillus"],
      detalhes: [
        {
          titulo: "Where it fits into the routine",
          texto: "In facility cleaning and in drinking water. It requires no change in management and no new equipment.",
        },
      ],
    },
    "saude-unica-aves": {
      resumo: "Improves feed conversion and average daily gain, while modulating the gut microbiota.",
      chamada: "FCR, ADG and GIT in a single product",
      descricao:
        "Poultry health depends on the balance between feed, drinking water, facilities and management. A 100% natural technology that, applied to the environment and drinking water, reduces the level of disease-causing pathogenic microorganisms and also cuts offensive gases.",
      beneficios: [
        "Better FCR (Feed Conversion Ratio)",
        "Positive increase in ADG (Average Daily Gain)",
        "Balanced gut microbiota with GIT modulation",
        "Progressive development of the immune system",
        "Fewer offensive gases in the poultry house",
      ],
      composicao: ["Yeast", "Lactobacillus", "Lactobacillus", "Lactobacillus"],
    },
  },
  es: {
    "agricultura-unica": {
      resumo:
        "Biotecnología 100% natural aplicable a cualquier cultivo. Revitaliza la microbiota del suelo y reduce la dependencia de insumos químicos.",
      chamada: "La mejor alternativa para la agricultura",
      descricao:
        "Microorganismos benéficos que actúan por dos vías: compiten directamente con los patógenos causantes de enfermedades y aceleran la digestión de la materia orgánica, liberando nutrientes que la planta absorbe con mayor eficiencia. El resultado se ve en la productividad, en el costo por hectárea y en la salud del suelo a lo largo de las cosechas.",
      beneficios: [
        "Mayor productividad",
        "Menor costo agregado",
        "Revitaliza la microbiota del suelo",
        "Cosecha más homogénea",
        "Enriquece el suelo con sustancias benéficas",
        "Menor incidencia de enfermedades y plagas",
        "Mejor condición de la planta ante el estrés hídrico",
        "Ecológicamente correcto, sin impactos ambientales",
      ],
      composicao: ["Lactobacilos", "Saccharomyces", "Cianobacterias", "Lentilactobacillus"],
      cientifico: ["Lacticaseibacillus paracasei", "Saccharomyces cerevisiae", "Cianofíceas", "Lentilactobacillus parafarraginis"],
      detalhes: [
        {
          titulo: "Primera vía — competencia",
          texto:
            "Los microorganismos de la fórmula son depredadores naturales de los patógenos que causan enfermedades. Ocupan el espacio y el alimento que usaría el patógeno y reducen su población por competencia directa.",
        },
        {
          titulo: "Segunda vía — digestión acelerada",
          texto:
            "Descomponen los compuestos del suelo y liberan potasio, nitrógeno, calcio, magnesio, hierro, fósforo y azufre, además de antioxidantes, aminoácidos, enzimas y vitaminas A, B1, B12 y B5. También aumentan la permeabilidad del suelo, lo que favorece el desarrollo de raíces primarias y secundarias.",
        },
        {
          titulo: "Cultivos con uso comprobado",
          texto:
            "Soja, maíz, caña de azúcar, cítricos, frutas y hortalizas, cereales y granos. El producto es aplicable a cualquier cultivo.",
        },
      ],
    },
    saneamento: {
      resumo:
        "Biorremediador de alto rendimiento para plantas de tratamiento, ríos, lagunas, fosas sépticas y trampas de grasa.",
      chamada: "Revitalizar. Restaurar.",
      descricao:
        "Biorremediador de alto rendimiento compuesto por microorganismos en forma líquida, enfocado en mejorar el desempeño y en la sustitución parcial o total de productos químicos. Es facultativo, aerobio y anaerobio, por eso puede aplicarse en cualquier tipo de planta de tratamiento, y también en lagunas y ríos contaminados, sin ningún daño ambiental.",
      beneficios: [
        "Aplicable a cualquier tipo de planta de tratamiento",
        "Acción inmediata, sin período de adaptación",
        "Sustituye parcial o totalmente los productos químicos",
        "Elimina los gases ofensivos en su origen",
        "Sin daño ambiental: microorganismos benéficos naturales",
        "Ajusta los parámetros analíticos del agua tratada",
      ],
      composicao: ["Bacterias fotosintéticas", "Levaduras", "Bacterias ácido-lácticas"],
      detalhes: [
        {
          titulo: "Qué elimina",
          texto:
            "Los patógenos causantes de enfermedades y los productores directos de gases ofensivos — amoníaco, ácido sulfhídrico y metilmercaptano, entre otros que contaminan el aire alrededor de la planta.",
        },
        {
          titulo: "Cambia el proceso, no solo el insumo",
          texto:
            "Induce a los microorganismos neutros a realizar la fermentación natural de la materia, que antes ocurría por el proceso oxidativo debido al exceso de oxígeno. La materia orgánica se transforma rápidamente en sustancias benéficas que ayudan a revitalizar el cuerpo receptor.",
        },
        {
          titulo: "Dónde se aplica",
          texto: "Plantas de tratamiento de efluentes industriales o sanitarios; ríos, lagos y lagunas; fosas sépticas y trampas de grasa.",
        },
      ],
    },
    "saude-do-gado": {
      resumo:
        "Línea para ganadería bovina, 100% natural, basada en los pilares de compromiso, sostenibilidad y responsabilidad.",
      chamada: "Tecnología · Desempeño · Economía · Productividad",
      descricao:
        "La línea de BIO-X dedicada a la ganadería bovina, presentada en el material institucional bajo los pilares de compromiso, sostenibilidad y responsabilidad.",
      beneficios: [],
      composicao: [],
    },
    "saude-unica-suinos": {
      resumo:
        "Aplicado en el ambiente y en el agua de bebida, reduce patógenos, diarreas y gases ofensivos en la granja.",
      chamada: "Menos antibióticos, más bienestar",
      descricao:
        "La salud de los cerdos depende del equilibrio entre alimentación, agua de bebida, instalaciones y manejo. BIO-X Saúde Única es una tecnología 100% natural que, aplicada en el ambiente y en el agua de bebida, reduce el índice de microorganismos patógenos causantes de enfermedades como la diarrea, además de disminuir los gases ofensivos, favoreciendo el bienestar de los animales y de los trabajadores.",
      beneficios: [
        "Reducción significativa de la diarrea",
        "Menor uso de medicamentos y antibióticos",
        "Menos animales rezagados",
        "Menor mortalidad",
        "Potencia el sistema inmunológico",
        "Sanitizante natural para las instalaciones",
        "Repelente natural",
        "Menor uso de productos químicos",
      ],
      composicao: ["Levadura", "Lactobacilo", "Lactobacilo", "Lactobacilo"],
      detalhes: [
        {
          titulo: "Dónde entra en la rutina",
          texto: "En la limpieza de las instalaciones y en el agua de bebida. No exige cambios en el manejo ni equipos nuevos.",
        },
      ],
    },
    "saude-unica-aves": {
      resumo: "Mejora la conversión alimenticia y la ganancia diaria de peso, con modulación de la microbiota intestinal.",
      chamada: "CA, GDP y TGI en un solo producto",
      descricao:
        "La salud de las aves depende del equilibrio entre alimentación, agua de bebida, instalaciones y manejo. Tecnología 100% natural que, aplicada en el ambiente y en el agua de bebida, reduce el índice de microorganismos patógenos causantes de enfermedades, además de disminuir los gases ofensivos.",
      beneficios: [
        "Mejora de la C.A. (Conversión Alimenticia)",
        "Aumento positivo de la GDP (Ganancia Diaria de Peso)",
        "Equilibrio de la microbiota intestinal con modulación del TGI",
        "Desarrollo progresivo del sistema inmunológico",
        "Reducción de los gases ofensivos en el galpón",
      ],
      composicao: ["Levadura", "Lactobacilo", "Lactobacilo", "Lactobacilo"],
    },
  },
};
